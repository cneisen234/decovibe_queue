-----------------------------------------CALC FUNCTION-----------------------------------------------------
--CALL calc() TO RUN THIS FUNCTION
--This function runs all the calculations to figure how much money the student will receive for a specific pay period.
--Shows the total amount, how much is going to the students bank account, and how much the student will get a check for.

CREATE OR REPLACE PROCEDURE calc(
	)
LANGUAGE 'sql'
AS $BODY$
DELETE FROM "open_transaction";
INSERT INTO "open_transaction"(	
	lcf_id, first_name, last_name, grade, pay_day, date_submitted, pass_class,gpa, 
	clean_attend, detent_hours, act_or_job, passed_ua, current_service_hours,
	hw_rm_attended, comments,
	attend_payment,pif_donations, bonus_amount, bonus_comments, 
	gpa_bonus, amt_to_savings, money_to_student,student_debt, student_debt_payment, student_debt_remaining, total )
	
 	SELECT entry.lcf_id, student.first_name as first_name, student.last_name as last_name, student.grade as grade,
	pay_day, date_submitted, pass_class, entry.gpa,
	clean_attend, detent_hours, act_or_job, passed_ua, current_service_hours,
 	hw_rm_attended, comments,
	CASE 
	WHEN (pass_class = 'Yes' and entry.gpa >= 2 and detent_hours = 'No' and act_or_job = 'Yes' and passed_ua = 'Yes' and current_service_hours >= 2 and hw_rm_attended = 'Yes') 
	THEN clean_attend * Daily_rates.amount 
	ELSE 0 END as attend_payment,
	student.pif_amount as pif_donations,
	entry.bonus_amount as bonus_amount,
	entry.bonus_comments as bonus_comments,
	CASE 
	WHEN (pass_class = 'Yes' and entry.gpa >= 2 and detent_hours = 'No' and act_or_job = 'Yes' and passed_ua = 'Yes' and current_service_hours >= 2  and hw_rm_attended = 'Yes') 
	THEN gpa_rates.amount
	ELSE 0 END as gpa_bonus,
	CASE 
	WHEN (pass_class = 'Yes' and entry.gpa >= 2 and detent_hours = 'No' and act_or_job = 'Yes' and passed_ua = 'Yes' and current_service_hours >= 2  and hw_rm_attended = 'Yes') 
	THEN (clean_attend * Daily_rates.amount + gpa_rates.amount) / 2 
	ELSE 0 END as amt_to_savings,
	CASE 
	WHEN (pass_class = 'Yes' and entry.gpa >= 2 and detent_hours = 'No' and act_or_job = 'Yes' and passed_ua = 'Yes' and current_service_hours >= 2  and hw_rm_attended = 'Yes') 
	THEN CASE 
	WHEN (((clean_attend * Daily_rates.amount + gpa_rates.amount + entry.bonus_amount ) / 2 ) - student.pif_amount - student.balance_due) < 0 THEN 0 
	ELSE (((clean_attend * Daily_rates.amount + gpa_rates.amount + entry.bonus_amount) / 2 ) - student.pif_amount - student.balance_due) END
	ELSE 0 END as money_to_student,
  	student.balance_due as student_debt,
 	CASE
	WHEN (pass_class = 'Yes' and entry.gpa >= 2 and detent_hours = 'No' and act_or_job = 'Yes' and passed_ua = 'Yes' and current_service_hours >= 2  and hw_rm_attended = 'Yes')
	THEN CASE
 	WHEN student.balance_due <= (((clean_attend * Daily_rates.amount + gpa_rates.amount + entry.bonus_amount ) / 2 ) - student.pif_amount)
 	THEN student.balance_due
  	WHEN student.balance_due > (((clean_attend * Daily_rates.amount + gpa_rates.amount + entry.bonus_amount ) / 2 ) - student.pif_amount)
  	THEN (((clean_attend * Daily_rates.amount + gpa_rates.amount + entry.bonus_amount ) / 2 ) - student.pif_amount)
	END
	ELSE 0
 	END
 	as student_debt_payment,
 	CASE
	WHEN (pass_class = 'Yes' and entry.gpa >= 2 and detent_hours = 'No' and act_or_job = 'Yes' and passed_ua = 'Yes' and current_service_hours >= 2  and hw_rm_attended = 'Yes') 
	THEN CASE
 	WHEN student.balance_due <= (((clean_attend * Daily_rates.amount + gpa_rates.amount + entry.bonus_amount ) / 2 ) - student.pif_amount)
 	THEN student.balance_due - student.balance_due
 	WHEN student.balance_due > (((clean_attend * Daily_rates.amount + gpa_rates.amount + entry.bonus_amount ) / 2 ) - student.pif_amount)
 	THEN student.balance_due - (((clean_attend * Daily_rates.amount + gpa_rates.amount + entry.bonus_amount ) / 2 ) - student.pif_amount)
 	END
	ELSE student.balance_due
	END
 	as student_debt_remaining,
	CASE 
	WHEN (pass_class = 'Yes' and entry.gpa >= 2 and detent_hours = 'No' and act_or_job = 'Yes' and passed_ua = 'Yes' and current_service_hours >= 2  and hw_rm_attended = 'Yes') 
	THEN clean_attend * Daily_rates.amount + gpa_rates.amount 
	WHEN (pass_class = 'Yes' and entry.gpa >= 2 and detent_hours = 'No' and act_or_job = 'Yes' and passed_ua = 'Yes' and current_service_hours >= 2  and hw_rm_attended = 'Yes' and grade < 9) 
	THEN (clean_attend * Daily_rates.amount + gpa_rates.amount) / 2 
	ELSE 0 END as total
	FROM entry  
 	left outer join gpa_rates  on ROUND(entry.gpa ,1 ) = gpa_rates.gpa
  	inner join student on student.lcf_id = entry.lcf_id
 	inner join daily_rates on daily_rates.school_year = student.grade
	 $BODY$;


---------------------------------CONFIRM FUNCTION TO PUSH TO HISTORY AND UPDATE STUDENT BALANCE DUE----------------------------------------------

--CALL confirm() TO RUN THIS FUNCTION
--This function takes all the information from calculated from the previous function and inserts it into the right places.
--So after the admin confirmed all the amounts are correct they will run this function pushing it into history
--and updates the student new amount due from what was paid out of their check depending on how much they owe
--Also clears out the student entries and open transactions tables to make way for the next pay period.

CREATE OR REPLACE PROCEDURE confirm(
	)
LANGUAGE 'sql'
AS $BODY$ INSERT INTO history(
	 lcf_id, first_name, last_name, pay_day, date_submitted, 
	pass_class, gpa, clean_attend, detent_hours, act_or_job,
	passed_ua, current_service_hours, hw_rm_attended,
	comments, attend_payment, pif_donations, bonus_amount, bonus_comments, 
	gpa_bonus, amt_to_savings, money_to_student, student_debt, student_debt_payment,
	student_debt_remaining, total)
	SELECT  lcf_id, first_name, last_name, pay_day, date_submitted, pass_class, 
	gpa, clean_attend, detent_hours, act_or_job, passed_ua, 
	current_service_hours, hw_rm_attended, comments,
	attend_payment, pif_donations, bonus_amount, bonus_comments, gpa_bonus,
	amt_to_savings, money_to_student, student_debt, student_debt_payment,
	student_debt_remaining, total
	FROM open_transaction;
	UPDATE student
	SET balance_due = student_debt_remaining
	FROM open_transaction
	WHERE student.lcf_id = open_transaction.lcf_id;
	DELETE FROM open_transaction
	USING history
	WHERE open_transaction.lcf_id = history.lcf_id;
	DELETE FROM entry

	$BODY$;

