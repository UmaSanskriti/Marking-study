window.questionDB = {
  part1: [
    {id:'i001',maxMarks:1,question:`When it is 09 00 in Singapore, it is 11 00 in Melbourne. Madam
Rohaya called her husband who was working in Melbourne at 01 30
Singapore time. What was the time in Melbourne when Madam Rohaya
called her husband?`,solution:`09 00 \xrightarrow{\;2h\;} 11 00
Melbourne is 2 hours ahead of Singapore.

01 30 \xrightarrow{\;2h\;} 03 30
Ans: 03 30`,studentAnswer:`03 30`,correctMark:1,aiMark:1,aiConfidence:'High Confidence',stagedExplanation:`Final answer step summary: The time in Melbourne was 03 30.
Marker's rationale: The student's answer matches the solution because the time given, 03 30, is exactly the required answer, no units are needed, and the format (24-hour with a space separator) is acceptable under the guidelines.`,summaryExplanation:`The final answer “03 30” exactly matches the required time; no units are needed and the 24-hour format with a space separator is acceptable, so the response is correct.`,rubricJson:`[
  {
    "step_code": "Final answer",
    "step_summary": "The time in Melbourne was 03 30.",
    "evidence_required": "03 30",
    "mark_value": "1",
    "units_required": "none"
  }
]`,markingGuideline:`B) General marking standards  
3. All answers must be precise and exact unless otherwise stated.

C) Common presentation errors  
5. Redundancy – Leading zero, trailing zero, and zero place holders  
   Trailing zeros on number pattern can be accepted  
   - 0.900 (correct)

E) Alternative format provided by students  

3. Time  
When question states that the answer has to be in 24 hour format, for example: 09 50, only accept the following variations. Do not accept 12-hour formats.  
E.g.  
- 09 50 (Correct)  
- 0950 (Correct)  
- 09:50 (Correct)  
- 9 50 (Wrong)`},
    {id:'i002',maxMarks:1,question:`Which two points (A, B, C and D) will form a right angle when we draw two straight lines from these two points to join to point X?

![Image](https://storage.googleapis.com/geniebook/images/question/Default Folder/19694a_qsn_img_0_1604936482.png)`,solution:`Points B and D`,studentAnswer:`bd`,correctMark:0,aiMark:0,aiConfidence:'High Confidence',stagedExplanation:`Final answer step summary: Points B and D form the required right angle with X.
Marker's rationale: The student's answer does not match the solution because, although the chosen points are correct, the letters are written in lowercase ('bd') instead of the required uppercase ('B, D'), violating the specified presentation rule for geometry labels.`,summaryExplanation:`Although the correct points (B and D) were selected, the student wrote them in lowercase (“bd”), violating the rule that geometry labels must be uppercase; therefore, the otherwise correct choice is marked incorrect.`,rubricJson:`[
  {
    "step_code": "Final answer",
    "step_summary": "Points B and D form the required right angle with X.",
    "evidence_required": "Points B and D",
    "mark_value": "1",
    "units_required": "none"
  }
]`,markingGuideline:`B) General marking standards  
3. All answers must be precise and exact unless otherwise stated.  

C) Common presentation errors  
12. Labelling for geometry questions needs to strictly follow the question. When the given letters are in capital form, the answers given by students have to also be in capital letter.  
    E.g.  
    - AB (correct)  
    - ab (wrong)  
    - ∠ABC (correct)  
    - ∠abc (wrong)  
    - angle ABC (correct)  
    - angle abc (wrong)  

D) Units related marking  
1. Angles without a degree sign will be marked down.  
    E.g.  
    - 90º (correct)  
    - 90 degrees (correct)  
    - 90 (wrong)  
    - 90 degree (correct)`},
    {id:'i003',maxMarks:2,question:`342 min $=$ ______ h ______ min`,solution:`60, 120, 180, 240, 300, 360, ...

Maximum multiple of 60 min $=$ 300 min, which gives us 5 hours

342 min $-$ 300 min $=$ 42 min
342 min $=$ 5 h 42 min 
Ans: 5 h 42 min`,studentAnswer:`6h 10min`,correctMark:0,aiMark:0,aiConfidence:'High Confidence',stagedExplanation:`S1 step summary: Determine the greatest whole number of hours contained in 342 minutes
Marker's rationale: The student's answer does not match the solution because no evidence of identifying 5 hours (the greatest whole number of hours in 342 minutes) is present.

Final answer step summary: State the equivalent time in hours and remaining minutes
Marker's rationale: The student's answer does not match the solution because the stated time 6 h 10 min is not equivalent to 5 h 42 min, even though units and format are acceptable.`,summaryExplanation:`No evidence was shown for identifying the greatest whole hours in 342 minutes (5 h), and the final answer “6 h 10 min” is not equivalent to “5 h 42 min.” While units and formatting are fine, the missing step and incorrect equivalence result in no credit.`,rubricJson:`[
  {
    "step_code": "S1",
    "step_summary": "Determine the greatest whole number of hours contained in 342 minutes",
    "evidence_required": "5 h",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "Final answer",
    "step_summary": "State the equivalent time in hours and remaining minutes",
    "evidence_required": "5 h 42 min",
    "mark_value": "2",
    "units_required": "none"
  }
]`,markingGuideline:`B) General marking standards  
3. All answers must be precise and exact unless otherwise stated.  

C) Common presentation errors  
5. Redundancy – Leading zero, trailing zero, and zero place holders  
   E.g.  
   - 8L 020 mL (wrong)  
   - 8L 20 mL (correct)  
   - 0 m 95 cm (wrong)  
   - 95 cm (correct)  
   (Apply the same idea to times; unnecessary leading zeros such as “05 h” may be penalised.)  

E) Alternative format provided by students  
4. Duration  
   Original answer: 2h 45 min  
   - 2h 45 mins (Correct)  
   - 2h 45 m (Wrong)`},
    {id:'i004',maxMarks:2,question:`Fill in the correct number of minutes and seconds.

[Previous Question Part]
Question Part 1:
78 s $=$ ________ min _______ s
Question Part 2:
90 s $=$ ________ min _______ s
Question Part 3:
142 s $=$ ________ min _______ s
Question Part 4:
127 s $=$ ________ min _______ s
Question Part 5:
195 s $=$ ________ min _______ s
Question Part 6:
206 s $=$ ________ min _______ s
Question Part 7:
248 s $=$ ________ min _______ s
Question Part 8:
430 s $=$ ________ min _______ s
Question Part 9:
335 s $=$ ________ min _______ s

[Question]
600 s $=$ ________ min _______ s`,solution:`10 min  0 s`,studentAnswer:`10 min`,correctMark:1,aiMark:1,aiConfidence:'Low Confidence',stagedExplanation:`S1 step summary: Find the number of whole minutes in 600 seconds
Marker's rationale: The student's answer fully matches the solution because the value "10 min" is present, showing the correct number of whole minutes in 600 s.

Final answer step summary: State minutes and remaining seconds
Marker's rationale: The student's answer does not match the solution because it omits the seconds part; hence it is not equivalent to “10 min 0 s”, lacks the required “s” unit, and the format is incomplete.`,summaryExplanation:`The student correctly found “10 min” as the number of whole minutes in 600 s, earning the step mark. However, the final answer omitted the seconds component and the “s” unit, so it is not equivalent to “10 min 0 s,” making the final response incomplete/incorrect.`,rubricJson:`[
  {
    "step_code": "S1",
    "step_summary": "Find the number of whole minutes in 600 seconds",
    "evidence_required": "10 min",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "Final answer",
    "step_summary": "State minutes and remaining seconds",
    "evidence_required": "10 min 0 s",
    "mark_value": "2",
    "units_required": "none"
  }
]`,markingGuideline:`B) General marking standards  
3. All answers must be precise and exact unless otherwise stated.  

C) Common presentation errors  
5. Redundancy – Leading zero, trailing zero, and zero place holders  
   E.g.  
   - 8L 020 mL (wrong)  
   - 8L 20 mL (correct)  
   (Similar idea applies to unnecessary leading or trailing zeros in time answers, e.g. writing “010 min” for “10 min” would be penalised.)  

E) Alternative format provided by students  

4. Duration  
Original answer: 2h 45 min  
- 2h 45 mins (Correct)  
- 2h 45 m (Wrong)  

(For this question, equivalent variations such as “10 min 0 s”, “10 mins 0 sec”, “10 minutes 0 seconds”, etc. follow the same rule: the unit “min/mins/minutes” must be spelt correctly, and the unit “s/sec/seconds” must be clear; abbreviations must not be incorrect.)`},
    {id:'i005',maxMarks:3,question:`Jane went shopping in 5 different shops with some money. She spent
an average of $5n per shop. She spent $45 in the first shop and
spent $6n more in the second shop than in the first shop.
What was the average amount of money she spent in the remaining
shops? Express your answer in terms of n.`,solution:`Total amount of money spent in the 5 shops 
= 5 \times $5n 
= $25n 

Amount of money spent in the first shop = $45 

Amount of money spent in the second shop = $(45 + 6n)

Total amount of money spent in the first and second shop 
= $(45 + 45 + 6n) 
= $(90 + 6n)

Total amount of money spent in the remaining shops 
= $(25n - 90 - 6n) 
= $(25n - 6n - 90) 
= $(19n - 90)

Average amount of money spent in the remaining shops 
= $(19n - 90) \div 3 
= $(\frac{19n \, - \, 90}{3}) 

Ans: $(\frac{19n \, - \, 90}{3})`,studentAnswer:`Total amount spent = (5n × 5) = $25n
Amount spent in first 2 shops = (45 + 45 + 6n) = (90 + 6n)
Amount spent in remaining shops = (25n - 90 + 6n) = (31n - 90)
Average amount of money spent in remaining shops = $(\frac{31n - 90}{3}) = $(\frac{31}{3}n - 30)
The average amount of money she spent in the remaining shops is $(\frac{31}{3}n -30).`,correctMark:1,aiMark:1,aiConfidence:'High Confidence',stagedExplanation:`S1 step summary: Find total amount spent in the first two shops
Marker's rationale: The student's answer fully matches the solution because the total spent in the first two shops, 90+6n, appears exactly in the working.

S2 step summary: Find total amount spent in the remaining three shops
Marker's rationale: The student's answer does not match the solution because the expression for the remaining three shops is 31n−90, not the correct 19n−90.

Final answer step summary: Compute the average amount spent in the remaining shops
Marker's rationale: The student's answer does not match the solution because the expression given, (31n−90)/3, is not algebraically equivalent to the required (19n−90)/3, although it is written with a dollar sign and in an acceptable format.`,summaryExplanation:`The total for the first two shops was correctly shown as 90 + 6 n 90+6n. But the remaining three shops were written as 31 n − 90 31n−90 instead of the correct 19 n − 90 19n−90, leading to a final average of ( 31 n − 90 ) / 3 (31n−90)/3, which is not equivalent to the required ( 19 n − 90 ) / 3 (19n−90)/3. Notation and format were acceptable but the algebra was wrong.`,rubricJson:`[
  {
    "step_code": "S1",
    "step_summary": "Find total amount spent in the first two shops",
    "evidence_required": "$90+6n$",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "S2",
    "step_summary": "Find total amount spent in the remaining three shops",
    "evidence_required": "$19n-90$",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "Final answer",
    "step_summary": "Compute the average amount spent in the remaining shops",
    "evidence_required": "$(19n-90)/3$",
    "mark_value": "3",
    "units_required": "$"
  }
]`,markingGuideline:`B) General marking standards  
3. All answers must be precise and exact unless otherwise stated.  

C) Common presentation errors  
1. Inappropriate use of equal signs  
   E.g.  
   - 40% = $300 (wrong)  
   - 4/10 = $300 (wrong)  
   - 0.4 = $300 (wrong)  
   - 3/4 = 4/5 (wrong)  
   - 7/11 = 0.636 (wrong)  
   - 7/11 ≈ 0.64 (correct)  

2. Algebraic fractions given in linear format which changes the meaning of the fraction will be penalized.  
   E.g.  
   - 3x + 4 / 7 (wrong) (3x + 4) / 7 (correct)  

3. Algebraic terms with coefficient 1 written will be marked down.  
   E.g.  
   - 1a + 3 (wrong)  
   - a + 3 (correct)  

4. Separate algebra terms with units that are given without brackets will be marked down.  
   E.g.  
   - 2a + 3 cm (wrong)  
   - (2a + 3) cm (correct)  
   - 3x + 2 years (wrong)  
   - (3x+2) years (correct)  

5. Redundancy – Leading zero, trailing zero, and zero place holders  
   E.g.  
   - 8L 020 mL (wrong)  
   - 8L 20 mL (correct)  
   - 8020 mL (correct)  
   - 0 m 95 cm (wrong)  
   - 95 cm (correct)  
   - 2.34 litres (correct)  
   - 2.340 litres (wrong) unless question specified 3 decimal places  
   - 173.9 (correct)  
   - 173.90 (wrong) unless question specified 2 decimal places  
     
   Trailing zeros on number pattern can be accepted  
   - 0.900 (correct)  

D) Units related marking  
6. The usage of S and c for dollars and cents is acceptable. Not all students understand how to type $ and ¢.  
   E.g.  
   - 50c (correct)  
   - S100 (correct)  

E) Alternative format provided by students  

6. Money  
   Writing dollars and cents in words is acceptable; Interchanging of comma (,) and period (.) is not acceptable; Using unnecessary brackets is not acceptable  
   - $20 and 50¢ (Correct)  
   - 20 dollars and 50 cents (Correct)  
   - $2500 (Correct)  
   - $2 500 (Correct)  
   - $1,250.50 (Correct)  
   - $(10t) (Wrong)  
   - $1250,50 (Wrong)`},
    {id:'i006',maxMarks:3,question:`Peter drew 2 semicircles and 1 triangle PRS. RO and PS are the
height and the base of the triangle respectively. O is the centre
of the 2 semicircles. The diameters of the big and small semicircle
are 14 cm and 10 cm respectively. What is the total area of the
shaded parts?<br>
(Take $\pi$ to be $\frac{22}{7}$)

![Image](https://storage.googleapis.com/geniebook/images/question/Default Folder/87219a_qsn_img_0_1606026511.png)`,solution:`Radius of big semicircle = 14 cm \div 2 = 7 cm

Area of big semicircle
= \frac{1}{2} \times \frac{22}{7} \times 7 cm \times 7
cm
= 77 cm^2

Area of triangle
= \frac{1}{2} \times 14 cm \times 7 cm
= 49 cm^2

Radius of small semicircle = 10 cm \div 2 = 5 cm

Area of small semicircle
= \frac{1}{2} \times \frac{22}{7} \times 5 cm \times 5
cm
= 39\frac{2}{7} cm^2

Area of shaded part
= (Area of big semicircle - Area of triangle) + Area of small
semicircle
= (77 cm^2 - 49 cm^2) + 39\frac{2}{7} cm^2
= 67\frac{2}{7} cm^2

Ans: 67\frac{2}{7} cm^2`,studentAnswer:`Area of big semicircle:$\frac{1}{2}$x$\frac{22}{7}$x7x7=77
Area of triangle:$\frac{1}{2}$x14x10=70
Area of small semicircle:$\frac{1}{2}$x$\frac{22}{7}$x5x5=39$\frac{2}{7}$
Shaded parts: 77-70=7
7+39$\frac{2}{7}$=46$\frac{2}{7}$cm$^{2}$`,correctMark:1,aiMark:2,aiConfidence:'High Confidence',stagedExplanation:`S1 step summary: Calculate area of the big semicircle
Marker's rationale: The student's answer fully matches the solution because the area of the big semicircle is correctly shown as 77 cm².

S2 step summary: Calculate area of the small semicircle
Marker's rationale: The student's answer fully matches the solution because the area of the small semicircle is correctly calculated as 39 2/7 cm².

Final answer step summary: Combine areas (big semicircle – triangle + small semicircle) to obtain total shaded area
Marker's rationale: The student's answer does not match the solution because the numerical value 46 2/7 cm² differs from the correct 67 2/7 cm², so Answer Equivalence fails. Units and format are acceptable but cannot earn marks without the correct value.`,summaryExplanation:`The areas of the big semicircle (77 cm²) and small semicircle (39 2/7 cm²) were both computed correctly. The final combined area, however, was given as 46 2/7 cm² rather than the correct 67 2/7 cm²; despite proper units and presentation, the wrong value loses the final mark.`,rubricJson:`[
  {
    "step_code": "S1",
    "step_summary": "Calculate area of the big semicircle",
    "evidence_required": "77 cm\u00b2",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "S2",
    "step_summary": "Calculate area of the small semicircle",
    "evidence_required": "39\u2156\u2044\u2087 cm\u00b2",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "Final answer",
    "step_summary": "Combine areas (big semicircle \u2013 triangle + small semicircle) to obtain total shaded area",
    "evidence_required": "67\u2156\u2044\u2087 cm\u00b2",
    "mark_value": "3",
    "units_required": "cm\u00b2"
  }
]`,markingGuideline:`Relevant rules for grading this question:

B) General marking standards  
1. All fractions and ratios must be left in the simplest form unless otherwise stated.  
2. All improper fractions must be converted to mixed numbers unless otherwise stated.  
3. All answers must be precise and exact unless otherwise stated.

C) Common presentation errors  
1. Inappropriate use of equal signs … will be penalized.  
5. Redundancy – Leading zero, trailing zero, and zero place holders … will be penalized.  
12. Labelling for geometry questions needs to strictly follow the question. When the given letters are in capital form, the answers given by students have to also be in capital letter.

D) Units related marking  
1. Angles without a degree sign will be marked down.  
(Area question – rule retained in case students cite angles.)

E) Alternative format provided by students  
2. Powers in units  
   Original form: cm²  
   - cm2 (Correct)  
   - cm^2 (Correct)  
   - cm square (Correct)  
   - square cm (Correct)  
   - ^cm2 (Wrong)

G) No calculator questions  
When the question states 'Show your working clearly', students' final answer step must include working. (Include since maybe no calculator.)

Finish within 500 words.`},
    {id:'i007',maxMarks:4,question:`Andy earned $4200 a month, while Brad earned $450 less than Andy
each month. Andy and Brad spent $1900 and $1550 a month
respectively, and saved the rest. What was the difference between
the monthly savings that Andy and Brad had?`,solution:`Brad's monthly salary = $4200 - $450 = $3750

Andy's monthly savings = $4200 - $1900 = $2300

Brad's monthly savings = $3750 - $1550 = $2200

Difference in their monthly savings = $2300 - $2200 =
$100

Ans: $100`,studentAnswer:`No of $ brad earned every month = 4200 - 450 = 3750

No of brad earned every month (after some money spent) = 3750 - 1550 =2200

No of Andy earned every month (after some money spent) = 4200 - 1900 =2300

The difference between the monthly savings that andy and brad had = 2300 - 2200 = 100

Ans 100`,correctMark:3,aiMark:3,aiConfidence:'High Confidence',stagedExplanation:`S1 step summary: Calculate Brad's monthly salary
Marker's rationale: The student's answer fully matches the solution because the value 3750, Brad’s salary, is explicitly shown.

S2 step summary: Calculate Andy's monthly savings
Marker's rationale: The student's answer fully matches the solution because the value 2300, Andy’s savings, is explicitly shown.

S3 step summary: Calculate Brad's monthly savings
Marker's rationale: The student's answer fully matches the solution because the value 2200, Brad’s savings, is explicitly shown.

Final answer step summary: Find the difference between Andy's and Brad's monthly savings
Marker's rationale: The student's answer partially matches the solution because the numeric answer 100 is correct (criterion 1) and clearly stated (criterion 3), but the required money unit “$” is missing in the final answer (criterion 2).`,summaryExplanation:`Intermediate values are all correct and shown: Brad’s salary 3750, Andy’s savings 2300, Brad’s savings 2200. The final numerical difference of 100 is correct and clearly presented, but the required money unit “$” is missing, so the otherwise correct answer is incomplete.`,rubricJson:`[
  {
    "step_code": "S1",
    "step_summary": "Calculate Brad's monthly salary",
    "evidence_required": "3750",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "S2",
    "step_summary": "Calculate Andy's monthly savings",
    "evidence_required": "2300",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "S3",
    "step_summary": "Calculate Brad's monthly savings",
    "evidence_required": "2200",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "Final answer",
    "step_summary": "Find the difference between Andy's and Brad's monthly savings",
    "evidence_required": "$100",
    "mark_value": "4",
    "units_required": "$"
  }
]`,markingGuideline:`The following rules from the Full Marking Guideline are required to grade students’ answers to this money-based savings-difference question.

B) General marking standards  
3. All answers must be precise and exact unless otherwise stated.

C) Common presentation errors  
1. Inappropriate use of equal signs  
5. Redundancy – Leading zero, trailing zero, and zero place holders

D) Units related marking  
6. The usage of S and c for dollars and cents is acceptable. Not all students understand how to type $ and ¢.  
   E.g.  
   - 50c (correct)  
   - S100 (correct)

E) Alternative format provided by students  
6. Money  
   Writing dollars and cents in words is acceptable; Interchanging of comma (,) and period (.) is not acceptable; Using unnecessary brackets is not acceptable  
   - $20 and 50¢ (Correct)  
   - 20 dollars and 50 cents (Correct)  
   - $2500 (Correct)  
   - $2 500 (Correct)  
   - $1,250.50 (Correct)  
   - $(10t) (Wrong)  
   - $1250,50 (Wrong)`},
    {id:'i008',maxMarks:4,question:`There are different coloured lights on a Christmas tree. The red light blink once every 2 seconds, the green light blink once every 5 seconds and the yellow light blink once every 10 seconds. How many times will all three coloured lights blink together in half a minute?`,solution:`Multiples of 2: 2, 4, 6, 8, 10
Multiples of 5: 5, 10, 15, 20, 25
Multiples of 10: 10, 20, 30, 40 , 50
All three coloured lights will blink together every 10 s.
Half a minute = 30 s
Number of times all three coloured lights will blink together in 30 seconds = 30 s ÷ 10 s= 3
Ans: 3 times`,studentAnswer:`Multiples of 2:  2 , 4, 6, 8, 10, 12, 14, 16, 18, 20
Multiples of 5: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50
Multiples of 10:  10, 20, 30, 40, 50, 60, 70, 80, 90, 100
Ans : 10`,correctMark:2,aiMark:1,aiConfidence:'Low Confidence',stagedExplanation:`S1 step summary: Find the common blinking interval (LCM of 2 s, 5 s and 10 s)
Marker's rationale: The student's answer fully matches the solution because the value 10 appears in all three multiple lists, showing they identified 10 s as the common blinking interval.

S2 step summary: Convert half a minute to seconds
Marker's rationale: The student's answer does not match the solution because there is no conversion of half a minute to 30 s anywhere in the working.

S3 step summary: Calculate how many common intervals fit into 30 s
Marker's rationale: The student's answer does not match the solution because they did not divide 30 s by 10 s to obtain 3; no value ‘3’ is shown.

Final answer step summary: State the total number of times all lights blink together in half a minute
Marker's rationale: The student's answer does not match the solution because the stated total (10) is not mathematically equivalent to the required answer 3. Units are not required and the format is acceptable, but correctness fails.`,summaryExplanation:`The common blinking interval was correctly identified as 10 s. The student did not convert half a minute to 30 s, nor show dividing 30 s by 10 s to obtain 3. The final answer “10” is therefore not equivalent to the required “3,” even though formatting and units needs were otherwise acceptable.`,rubricJson:`[
  {
    "step_code": "S1",
    "step_summary": "Find the common blinking interval (LCM of 2 s, 5 s and 10 s)",
    "evidence_required": "10 s",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "S2",
    "step_summary": "Convert half a minute to seconds",
    "evidence_required": "30 s",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "S3",
    "step_summary": "Calculate how many common intervals fit into 30 s",
    "evidence_required": "3",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "Final answer",
    "step_summary": "State the total number of times all lights blink together in half a minute",
    "evidence_required": "3",
    "mark_value": "4",
    "units_required": "none"
  }
]`,markingGuideline:`The following rules from the Full Marking Guideline are potentially relevant for grading pupils’ answers to the Christmas-tree blinking-lights question. (Section / rule numbers are kept unchanged.)

B) General marking standards  
3. All answers must be precise and exact unless otherwise stated.

C) Common presentation errors  
1. Inappropriate use of equal signs  
   E.g.  
   - 40% = $300 (wrong)  
   …  
   (Ensure a pupil does not use an unjustified “=” before the final answer.)  

5. Redundancy – Leading zero, trailing zero, and zero place holders  
   E.g.  
   - 173.9 (correct)  
   - 173.90 (wrong) unless question specified 2 decimal places  
   (If a pupil writes something like “03” or “3.0” when the exact answer is 3, apply this rule.)

D) Units related marking  
(There is no specific time-unit requirement for this problem, but pupils might append the word “times”.  None of the listed Unit rules penalise or mandate that, so no extra time-unit rule is extracted.)

H) Others  
6. When students are asked about how the items are grouped, as long as their answers are logically correct, we will give full marks.

(Although the question is not explicitly about grouping, pupils may explain grouping of seconds or blinks in their working; this rule allows flexibility in awarding method marks as long as logic is sound.)`}
  ],
  part2a: [
    {id:'a001',maxMarks:1,question:`The figure below is made up of a semi-circle and a rectangle. A
smaller circle fits in the middle of the semi-circle. 2 quarter
circles are enclosed within the rectangle. Find the area of the
unshaded region. (Take $\pi$ to be $\frac{22}{7}$)<br>The use of calculators is NOT allowed.

![Image](https://storage.googleapis.com/geniebook/images/question/Default Folder/10985a_qsn_img_0_1656902857.svg)`,solution:`Area of 2 big quarter circles of radius 14 cm 
$= \frac{1}{2} \pi r^{2} $
$= \frac{1}{2} \times \frac{22}{7} \times$ 14 cm $\times$ 14 cm 
$=$ 308  cm$^{2}$
Area of small circle of radius 7 cm $= \pi r^{2}$  
$= \frac{22}{7} \times$ 7 cm $\times$ 7 cm $=$ 154  cm$^{2}$
Total area of the unshaded region 
$=$ 308 cm$^2$ $+$ 154 cm$^2$ 
$=$ 462 cm$^{2} $

Ans: 462 cm$^2$`,studentAnswer:`\(462 cm^{2}\)`,correctMark:1,aiMark:1,aiConfidence:'High Confidence',stagedExplanation:`Final answer step summary: The area of the unshaded region is 462 cm².
Marker's rationale: The student's answer matches the solution because the numerical value (462) is identical to the required answer, includes the correct unit cm², and is clearly presented without any format errors.`,summaryExplanation:`The final answer is fully correct: 462 cm² matches the required value and unit, and it’s clearly presented with no formatting issues.`,rubricJson:`[
  {
    "step_code": "Final answer",
    "step_summary": "The area of the unshaded region is 462 cm².",
    "evidence_required": "462 cm²",
    "mark_value": "1",
    "units_required": "cm²"
  }
]`,markingGuideline:`The following rules from the Full Marking Guideline may be invoked when grading students’ answers to this “area of composite figure – no-calculator” question. Section / rule numbers are kept exactly as in the original document.

B) General marking standards  
1. All fractions and ratios must be left in the simplest form unless otherwise stated.  
2. All improper fractions must be converted to mixed numbers unless otherwise stated.  
3. All answers must be precise and exact unless otherwise stated.

C) Common presentation errors  
1. Inappropriate use of equal signs … will be penalized.  
5. Redundancy – Leading zero, trailing zero, and zero place holders … will be penalized.  
12. Labelling for geometry questions needs to strictly follow the question. When the given letters are in capital form, the answers given by students have to also be in capital letter.

D) Units related marking  
1. Angles without a degree sign will be marked down. (Relevant if any angle values are stated.)  
6. The usage of S and c for dollars and cents is acceptable. (Not directly relevant here but governs unit presentation in general.)  
8. Years are considered as units and will be treated accordingly. (General unit guidance.)

E) Alternative format provided by students  
2. Powers in units  
   Original form: cm²  
   - cm2 (Correct)  
   - cm^2 (Correct)  
   - cm square (Correct)  
   - square cm (Correct)  
   - ^cm2 (Wrong)

G) No calculator questions  
When the question states 'Show your working clearly', students' final answer step must include working.

H) Others  
2. If the question is 'what is the number of triangles shaded', we will mark down if students give fractions instead. (By extension, if an exact area is required, giving an unrelated form would be penalised.)

These copied rules cover fraction/precision requirements, correct unit notation for area (cm² variations), proper use of equal signs, avoidance of redundant zeros, geometric labelling, and the obligation to show working in this no-calculator context.`},
    {id:'a002',maxMarks:1,question:`In the figure below, not drawn to scale, G is the centre of the circle.
AB, CD, DE, EF are straight lines. $\small \angle$CGE is twice the size of $\small \angle$AGC. $\small \angle$ABD $= $ 123$^\circ$.

![Image](https://storage.googleapis.com/geniebook/images/question/Default Folder/30839des1_qsn_img_0_1391523382.png)

[Question]
<html><head></head><body><p>Name the angle which has the same size as $\angle$CAG.</p></body></html>`,solution:`Ans$: $\angle$GCA or $\angle$ACG`,studentAnswer:`gca`,correctMark:0,aiMark:0,aiConfidence:'High Confidence',stagedExplanation:`Final answer step summary: The angle equal to ∠CAG is named as ∠GCA or ∠ACG.
Marker's rationale: The student's answer does not match the solution because, although it names the correct angle (Criteria 1) and no units are needed (Criteria 2), the letters are written in lowercase. Geometry labels given in the question are capital letters, so per the marking guideline the required format is not followed, failing Criteria 3.`,summaryExplanation:`Although the named angle is mathematically correct, the response uses lowercase letters where capitals are required, so formatting criteria fail and the final answer is marked incorrect.`,rubricJson:`[
  {
    "step_code": "Final answer",
    "step_summary": "The angle equal to ∠CAG is named as ∠GCA or ∠ACG.",
    "evidence_required": "∠GCA or ∠ACG",
    "mark_value": "1",
    "units_required": "none"
  }
]`,markingGuideline:`C) Common presentation errors  
12. Labelling for geometry questions needs to strictly follow the question. When the given letters are in capital form, the answers given by students have to also be in capital letter.  
 E.g.  
 - AB (correct)  
 - ab (wrong)  
 - ∠ABC (correct)  
 - ∠abc (wrong)  
 - angle ABC (correct)  
 - angle abc (wrong)  
  For one-letter angle form, small letters are acceptable.  
  E.g.  
  - ∠y (correct)  
  - ∠Y (correct)`},
    {id:'a003',maxMarks:1,question:`Find the value of 2$\frac{3}{4}$ $\div$ 3.  Express your answer as a fraction in its simplest form.`,solution:`2$\frac{3}{4}$ $\div$ 3

$=$ $\frac{11}{4}$ $\div$ 3

$=$ $\frac{11}{4}$ $\times$ $\frac{1}{3}$

$=$ $\frac{11}{12}$

Ans: $\frac{11}{12}$`,studentAnswer:`$\frac{11}{12}$`,correctMark:1,aiMark:1,aiConfidence:'High Confidence',stagedExplanation:`Final answer step summary: The final answer is 11/12.
Marker's rationale: The student's answer matches the solution because the final value is exactly 11/12, no units are needed, and it is given as a fraction in simplest form.`,summaryExplanation:`The answer 11/12 exactly matches the required value, needs no units, and is in simplest fractional form, so it is fully correct.`,rubricJson:`[
  {
    "step_code": "Final answer",
    "step_summary": "The final answer is 11/12.",
    "evidence_required": "11/12",
    "mark_value": "1",
    "units_required": "none"
  }
]`,markingGuideline:`Relevant rules for grading this question:

B) General marking standards  
1. All fractions and ratios must be left in the simplest form unless otherwise stated.  
2. All improper fractions must be converted to mixed numbers unless otherwise stated.  
3. All answers must be precise and exact unless otherwise stated.  

C) Common presentation errors  
1. Inappropriate use of equal signs  
   E.g.  
   - 40% = $300 (wrong)  
   - 4/10 = $300 (wrong)  
   - 0.4 = $300 (wrong)  
   - 3/4 = 4/5 (wrong)  
   - 7/11 = 0.636 (wrong)  
   - 7/11 ≈ 0.64 (correct)  

9. The usage of : as a replacement of ÷ is acceptable  
   E.g.  
   - 10 : 2 = 5 (correct)  

E) Alternative format provided by students  

1. Fractions  
   Original answer: 1 2/3  
   - 1 2/3 (Correct)  
   - 1 and 2 out of 3 (Correct)  
   - 1 and 2 over 3 (Correct)  
   - 12/3 (Wrong)  
   - 1/2/3 (Wrong)`},
    {id:'a004',maxMarks:1,question:`[Previous Question Part]
Question Part 1:
In 816, the digit in the hundreds place is __________.
Question Part 2:
In 987, the digit in the tens place is ________.
Question Part 3:
In 463, the value of the digit 4 is ________.
Question Part 4:
In 388, the value of the digit 3 is _________.
Question Part 5:
In 897, the digit 9 is in the ____________ place.

[Question]
In 108, the digit 1 is in the ____________ place.`,solution:`hundreds`,studentAnswer:`hundred`,correctMark:0,aiMark:0,aiConfidence:'Low Confidence',stagedExplanation:`Final answer step summary: The digit 1 is in the hundreds place.
Marker's rationale: The student's answer does not match the solution because the required phrase for the place value is “hundreds”. Writing “hundred” omits the necessary plural form and is considered a different term, so the answer is not equivalent (Criteria 1 = 0). No units are required (Criteria 2 = 1) and the response is clearly written (Criteria 3 = 1). Since not all criteria are met, the overall mark is 0.`,summaryExplanation:`The response says “hundred” instead of the required “hundreds,” which is not equivalent; despite clear presentation and no unit requirement, the answer fails on correctness.`,rubricJson:`[
  {
    "step_code": "Final answer",
    "step_summary": "The digit 1 is in the hundreds place.",
    "evidence_required": "hundreds",
    "mark_value": "1",
    "units_required": "none"
  }
]`,markingGuideline:`Relevant rules for grading this question:

B) General marking standards  
3. All answers must be precise and exact unless otherwise stated.

C) Common presentation errors  
6. Grammar – No marks will be deducted for grammar errors unless it is numbers-to-word questions.`},
    {id:'a005',maxMarks:2,question:`Ellyn used half of the water in Container A to fill up 3 jars
completely. The capacity of each jar is 475 m$\small\ell$. Find the
capacity of Container A. Give your answer in litres and
millilitres.

![Image](https://storage.googleapis.com/geniebook/images/question/Default Folder/53386a_qsn_img_0_1518928900.png)`,solution:`Volume of 3 such jars $=$ 475 m$\small\ell$ $\times$ 3 $=$ 1425
m$\small\ell$

Capacity of container A $=$ 1425 m$\small\ell$ $\times$ 2 $=$ 2850
m$\ell$ $=$ 2 $\small\ell$ 850 m$\ell$

Ans: 2 $\ell$ 850 m$\ell$`,studentAnswer:`475mL x 3 = 1425mL

1425mL = 1 L  425mL`,correctMark:1,aiMark:1,aiConfidence:'High Confidence',stagedExplanation:`S1 step summary: Find total volume of water in 3 jars.
Marker's rationale: The student's answer fully matches the solution because 1425 mL appears explicitly, satisfying the required evidence for this step.

Final answer step summary: State capacity of Container A in litres and millilitres.
Marker's rationale: The student's answer does not match the solution because the stated capacity (1 L 425 mL) is not mathematically equivalent to the required 2 L 850 mL, although correct units and acceptable format were used.`,summaryExplanation:`The student correctly completed S1 by computing the total water in three jars as 1425 mL, which matches the required evidence. However, the final answer was wrong: they stated Container A’s capacity as 1 L 425 mL instead of the required 2 L 850 mL. Despite this error in value (failing answer equivalence), the response used acceptable units (L/mL) and a clear format, so unit and presentation criteria were met. This aligns with the rubric and unit rules, yielding credit for S1 only and none for the incorrect final capacity.`,rubricJson:`[
  {
    "step_code": "S1",
    "step_summary": "Find total volume of water in 3 jars",
    "evidence_required": "1425 mL",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "Final answer",
    "step_summary": "State capacity of Container A in litres and millilitres",
    "evidence_required": "2 L 850 mL",
    "mark_value": "2",
    "units_required": "L and mL"
  }
]`,markingGuideline:`Relevant rules to grade this question  

B) General marking standards  
1. All fractions and ratios must be left in the simplest form unless otherwise stated.  
2. All improper fractions must be converted to mixed numbers unless otherwise stated.  
3. All answers must be precise and exact unless otherwise stated.  

C) Common presentation errors  
5. Redundancy – Leading zero, trailing zero, and zero place holders  
   E.g.  
   - 8L 020 mL (wrong)  
   - 8L 20 mL (correct)  
   - 8020 mL (correct)  
   (…examples continue as in guideline…)  

D) Units related marking  
6. The usage of S and c for dollars and cents is acceptable. (Although for this question we expect “L”, “l”, “mL” or “ml”, this rule reminds markers that accepted unit abbreviations are permissible.)`},
    {id:'a006',maxMarks:2,question:`A group of 36 girls shared some beads.  After they had taken 79 beads each, there were 16 beads left.  How many beads were there at first?`,solution:`
36 girls $=$ 36 $\times$ 79 $=$ 2844 beads

At first $=$ 2844 $+$ 16 $=$ 2860

Ans: 2860 beads`,studentAnswer:`2860`,correctMark:2,aiMark:2,aiConfidence:'High Confidence',stagedExplanation:`S1 step summary: Find total beads taken by the 36 girls
Marker's rationale: The student's answer does not match the solution because the working showing 2844 beads (total taken) is absent.

Final answer step summary: Compute initial number of beads before sharing
Marker's rationale: The student's answer fully matches the solution because the final value 2860 is correct, no specific unit is required, and the answer is clearly stated without formatting issues.`,summaryExplanation:`The final value 2860 is correct and clearly stated, but the necessary working for 2844 beads taken by the girls is absent, so only the final-answer marks are awarded.`,rubricJson:`[
  {
    "step_code": "S1",
    "step_summary": "Find total beads taken by the 36 girls",
    "evidence_required": "2844 beads",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "Final answer",
    "step_summary": "Compute initial number of beads before sharing",
    "evidence_required": "2860 beads",
    "mark_value": "2",
    "units_required": "none"
  }
]`,markingGuideline:`Below are the ONLY rules that could potentially be required when grading pupils’ responses to this particular question:

B) General marking standards  
3. All answers must be precise and exact unless otherwise stated.  

C) Common presentation errors  
1. Inappropriate use of equal signs  
   E.g.  
   - 40% = $300 (wrong)  
   … (examples show that using “=” in a chain that is not true is penalised).  
5. Redundancy – Leading zero, trailing zero, and zero place holders  
   E.g.  
   - 173.9 (correct)  
   - 173.90 (wrong) unless question specified 2 decimal places  
   (Commas in 4-digit numbers such as 2,860 are acceptable; unnecessary zeros are penalised.)

G) No calculator questions  
When the question states 'Show your working clearly', students' final answer step must include working.`},
    {id:'a007',maxMarks:2,question:`<html><head></head><body><p>This is a net of a solid.</p></body></html>

![Image](https://attachment.srv.geniebook.com/api/v2/public/files/Q4mO2bu2deTrbDH8.svg)

[Previous Question Part]
Question Part 1:
<html><head></head><body><p>Name the solid that can be formed from the net.</p></body></html>

[Question]
<html><head></head><body><p>Which of the following solids can be formed from the net above?</p></body></html>

![Image](https://attachment.srv.geniebook.com/api/v2/public/files/xOGCQYZreqcoKIeS.svg)`,solution:`Ans$: Solid D`,studentAnswer:`Solid C and D`,correctMark:0,aiMark:0,aiConfidence:'High Confidence',stagedExplanation:`Final answer step summary: Identify the solid that matches the given net
Marker's rationale: The student's answer does not match the solution because although the format is acceptable and no units are required, the answer includes both Solid C and Solid D, which is not equivalent to the correct single answer Solid D.`,summaryExplanation:`The student selected both Solid C and Solid D; since the correct unique choice is Solid D, answer equivalence fails despite acceptable format and no unit requirement.`,rubricJson:`[
  {
    "step_code": "Final answer",
    "step_summary": "Identify the solid that matches the given net",
    "evidence_required": "Solid D",
    "mark_value": "2",
    "units_required": "none"
  }
]`,markingGuideline:`Relevant rules to grade this question:

B) General marking standards  
3. All answers must be precise and exact unless otherwise stated.  

C) Common presentation errors  
6. Grammar – No marks will be deducted for grammar errors unless it is numbers-to-word questions  
12. Labelling for geometry questions needs to strictly follow the question. When the given letters are in capital form, the answers given by students have to also be in capital letter.  
    E.g.  
    - AB (correct)  
    - ab (wrong)  
    - ∠ABC (correct)  
    - ∠abc (wrong)  
    - angle ABC (correct)  
    - angle abc (wrong)  
      
    For one-letter angle form, small letters are acceptable.  
    E.g.  
    - ∠y (correct)  
    - ∠Y (correct)  

D) Units related marking  
7. Students mentioning the shape instead of drawing is acceptable unless the question is about drawing.  
    E.g.  
    - Square (correct)  
    - ⬛️ (correct)`},
    {id:'a008',maxMarks:2,question:`The diagram below shows the amount of money 4 children have.

![Image](https://storage.googleapis.com/geniebook/images/question/2/216331_qsn_img_00.svg)

Which two children have enough money to each buy a candy that costs
30¢?`,solution:`Amount of money Chloe has  $=$ 50¢ $+$ 20¢ $+$ 10¢
 $=$ 80¢  
Amount of money Alex has  $=$ 10¢ $+$ 10¢ $+$ 5¢ 
 $=$ 25¢  
Amount of money Asher has $=$ 10¢ $+$ 5¢ $+$ 5¢ 
 $=$ 20¢  
Amount of money Adriel has  $=$ 20¢ $+$ 5¢ $+$ 5¢ 
 $=$ 30¢  
In order to be able to buy the candy, each child must have at least 30¢. Chloe and Adriel have at least 30¢. 
Ans$: Chloe and Adriel`,studentAnswer:`adriel`,correctMark:1,aiMark:0,aiConfidence:'High Confidence',stagedExplanation:`S1 step summary: Find the total amount of money each child has
Marker's rationale: The student's answer does not match the solution because no working showing the individual amounts (Chloe 80¢, Alex 25¢, Asher 20¢, Adriel 30¢) is provided.

Final answer step summary: State the two children who can each afford a 30¢ candy
Marker's rationale: The student's answer does not match the solution because it names only “Adriel” instead of both “Chloe and Adriel”. Units are not required and format is acceptable, but the essential answer is incomplete.`,summaryExplanation:`The individual totals for each child are not shown, and the final answer lists only Adriel rather than “Chloe and Adriel,” making the response incomplete though formatting is fine.`,rubricJson:`[
  {
    "step_code": "S1",
    "step_summary": "Find the total amount of money each child has",
    "evidence_required": "Chloe 80¢, Alex 25¢, Asher 20¢, Adriel 30¢",
    "mark_value": "1",
    "units_required": "none"
  },
  {
    "step_code": "Final answer",
    "step_summary": "State the two children who can each afford a 30¢ candy",
    "evidence_required": "Chloe and Adriel",
    "mark_value": "2",
    "units_required": "none"
  }
]`,markingGuideline:`The following rules from the Full Marking Guideline are needed to grade this question:

B) General marking standards  
3. All answers must be precise and exact unless otherwise stated.  

C) Common presentation errors  
5. Redundancy – Leading zero, trailing zero, and zero place holders  
   … (trailing zeros on number pattern can be accepted)  

D) Units related marking  
6. The usage of S and c for dollars and cents is acceptable. Not all students understand how to type $ and ¢.  
   E.g.  
   - 50c (correct)  
   - S100 (correct)  

E) Alternative format provided by students  
6. Money  
   Writing dollars and cents in words is acceptable; Interchanging of comma (,) and period (.) is not acceptable; Using unnecessary brackets is not acceptable  
   - $20 and 50¢ (Correct)  
   - 20 dollars and 50 cents (Correct)  
   - $2500 (Correct)  
   - $2 500 (Correct)  
   - $1,250.50 (Correct)  
   - $(10t) (Wrong)  
   - $1250,50 (Wrong)`}
  ],
  part2b: [

    {id:'b001',maxMarks:1,question:`Vani took part in a 2400 m race. She rested after 835 m and ran another 258 m before giving up. What is the distance she ran in all?`,solution:`1093 m`,studentAnswer:`835+258=1093`,correctMark:0,aiMark:0,aiConfidence:'high',stagedExplanation:`Unit m missing so marked 0.`,summaryExplanation:`Correct number but missing unit.`},
    {id:'b002',maxMarks:1,question:`A printer prints 25 copies in 30 s. How long for 80 copies?`,solution:`96 s`,studentAnswer:`96`,correctMark:0,aiMark:0,aiConfidence:'high',stagedExplanation:`Unit s missing.`,summaryExplanation:`Needs second unit.`},
    {id:'b003',maxMarks:1,question:`Mr Tan giving sweets: 12 each needs 38 more; 14 each needs 58 more. How many students?`,solution:`10`,studentAnswer:`10`,correctMark:1,aiMark:1,aiConfidence:'high',stagedExplanation:`Answer correct.`,summaryExplanation:`Fully correct.`},
    {id:'b004',maxMarks:1,question:`Nancy is 5x years old. She will be 4 times Ronald in 8 years. Find Ronald's age in 8 years in terms of x.`,solution:`(5x+8)/4`,studentAnswer:`5x+8/4`,correctMark:0,aiMark:0,aiConfidence:'low',stagedExplanation:`Missing brackets alters fraction.`,summaryExplanation:`Should be (5x+8)/4.`},
    {id:'b005',maxMarks:2,question:`Scale diagram: sum of values P and Q.`,solution:`2.02`,studentAnswer:`P:0.88 Q:1.14`,correctMark:1,aiMark:1,aiConfidence:'high',stagedExplanation:`Intermediate values given, sum missing.`,summaryExplanation:`Needed 2.02.`},
    {id:'b006',maxMarks:2,question:`Square garden 6m×6m divided into 3 equal rectangles. Area of each rectangle?`,solution:`12 m²`,studentAnswer:`12 cm²`,correctMark:1,aiMark:1,aiConfidence:'high',stagedExplanation:`Value correct but wrong unit cm².`,summaryExplanation:`Unit should be m².`},
    {id:'b007',maxMarks:2,question:`Two square towels A and B. Perimeter A is twice B. B side 32 cm. Find perimeter of A.`,solution:`256 cm`,studentAnswer:`256`,correctMark:1,aiMark:1,aiConfidence:'high',stagedExplanation:`Unit cm missing in final answer.`,summaryExplanation:`Should include cm.`},
    {id:'b008',maxMarks:2,question:`Sequence 711, 721, 741, __, 811, 861, __. Fill blanks.`,solution:`771, 921`,studentAnswer:`761, 921`,correctMark:1,aiMark:0,aiConfidence:'high',stagedExplanation:`First missing number incorrect.`,summaryExplanation:`Needs 771 and 921.`},
    {id:'b009',maxMarks:3,question:`Wendy 1 m 35 cm tall, 28 cm taller than Eden. Adele half as tall as total of Wendy and Eden. What is Adele's height (m and cm)?`,solution:`1 m 21 cm`,studentAnswer:`121 cm`,correctMark:2,aiMark:2,aiConfidence:'high',stagedExplanation:`Final not expressed in m and cm.`,summaryExplanation:`Answer should be 1 m 21 cm.`},
    {id:'b010',maxMarks:3,question:`Bales of rubber 375 kg each, cotton 126 kg. Find total mass of 12 rubber and 8 cotton bales.`,solution:`5508 kg`,studentAnswer:`12 bales of rubber:3000kg; 8 bales:1008`,correctMark:1,aiMark:1,aiConfidence:'high',stagedExplanation:`Mass of rubber miscomputed; total missing.`,summaryExplanation:`Should total 5508 kg.`},
    {id:'b011',maxMarks:3,question:`Two overlapping rectangles with square overlap area 64 cm². Find area of unshaded parts.`,solution:`654 cm²`,studentAnswer:`510 cm²`,correctMark:0,aiMark:0,aiConfidence:'high',stagedExplanation:`Rectangle area and unshaded computation wrong.`,summaryExplanation:`Correct total unshaded area is 654 cm².`},
    {id:'b012',maxMarks:3,question:`Anwar's age this year multiple of 7, next year multiple of 5, between 20 and 80. How old in 6 years?`,solution:`55`,studentAnswer:`55`,correctMark:2,aiMark:3,aiConfidence:'low',stagedExplanation:`Present age 49 not shown.`,summaryExplanation:`Final 55 correct.`},
    {id:'b013',maxMarks:4,question:`Tank A 12×10×20 cm, 2/3 filled. Half poured into Tank B initially 1/5 full, filling to brim. Total capacity of two tanks (litres)?`,solution:`3.4 L`,studentAnswer:`3900L`,correctMark:1,aiMark:1,aiConfidence:'high',stagedExplanation:`Only Tank A volume correct; rest wrong.`,summaryExplanation:`Total capacity should be 3.4 L.`},
    {id:'b014',maxMarks:4,question:`Mr Lee took 7 h from A to B; Mr Wong 8 h from B to A. Started same time towards each other; after 3 h, 110 km apart. What was Mr Lee's speed?`,solution:`80 km/h`,studentAnswer:`80km/h`,correctMark:4,aiMark:4,aiConfidence:'high',stagedExplanation:`Answer correct with unit.`,summaryExplanation:`Fully correct.`},
    {id:'b015',maxMarks:4,question:`Jeremy, Kris, Lenny stickers: Lenny twice Kris, Kris twice Jeremy, Kris has 48. Total stickers?`,solution:`168`,studentAnswer:`264`,correctMark:2,aiMark:1,aiConfidence:'high',stagedExplanation:`Lenny count incorrect leading to wrong total.`,summaryExplanation:`Should total 168.`},
    {id:'b016',maxMarks:4,question:`Ahmad paid 2 $10 notes and 3 $2 notes for snacks costing $24.40. Change given in 50c and 20c coins. How many coins did he receive?`,solution:`5`,studentAnswer:`$1.60`,correctMark:2,aiMark:1,aiConfidence:'low',stagedExplanation:`Total paid not shown; coin breakdown missing; final answer is value not count.`,summaryExplanation:`He received 5 coins (two 50c and three 20c).`}
  ]
};
