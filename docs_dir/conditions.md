# Pricelist Rule Conditions
A pricelist rule may be attached to certain conditions to limit how and when it is executed during charging calculation.

If the rule is not attached to any conditions, then it will be executed in every booking.

Meanwhile, if the rule is attached to multiple conditions, each rule has to pass in order for the rule to be executed.

Currently, we have 5 rule conditions available:

- [Service Question Answers](#service-question-answers)
- [Timings](#timings)
- [Holidays](#holidays)
- [Age Group](#age-group)
- [Experience](#experience)

## Service Question Answers

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/service-question-answers-condition.png" alt="Region Halland Pricelist" />

This condition will be applied if we want to differentiate the prices between different service question answers.

For example, you want to create a rule for Orthopedic doctors only. The rule condition should look like this:

| Service Question | Answers    |
|------------------|------------|
| Specialization   | Orthopedic |

Or if you want to create a rule for both Orthopedic doctors and Pediatricians, then the rule condition should look like this:

| Service        | Answers                |
|----------------|------------------------|
| Specialization | Orthopedic, Pediatrics |

> Take note that the condition will pass if the doctor is either an Orthopedic or a Pediatrician.

If you want to create a condition where you want to apply the pricelist rule to doctors who are both Orthopedic and Pediatrician, the condition should look like this:

| Service        | Answers    |
|----------------|------------|
| Specialization | Orthopedic |
| Specialization | Pediatrics |

## Timings

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/timings-condition.png" alt="Region Halland Pricelist" />

This condition will be applied if we want to limit certain rules to be executed only at certain days and/or times.

In the screenshot above, the first condition is applied on `Monday-Friday` from `8:00AM` to `5:00PM`.

The second condition is applied on `Monday-Friday` from `05:01PM - 10:00PM`.

The second condition is applied on `Monday-Friday` from `10:01PM - 07:59AM` the next day.

The fourth condition is applied on `Saturday-Sunday` whole day.

> Take note that if you add two timing conditions, both condition should pass in order for this rule to be executed. If only condition has passed, then this rule will be skipped.

## Holidays

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/holidays-conditions.png" alt="Region Halland Pricelist" />

In DT, there are two types of holidays: minor and major holidays.

In Talentemp, I would like to think of them as holiday groups. Basically, we create two holiday groups: minor and major holiday groups. Or we can even create more groups if more comes to mind.

And then each holiday created will be linked to a holiday group.

Now if we create a rule called `Minor Holiday Bonus`, we will apply a holiday group condition to that rule.

The rule can also be linked to a specific holiday condition, like `Easter Egg Bonus`.

## Age Group

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/age-condition.png" alt="Region Halland Pricelist" />

Together with [Currency Base Deduction](tnt/#currency-base-deduction), we apply that rule to certain age groups conditions.

Let's say we want to give people who are 65 years old and above a higher pay, then we create a rule with a higher salary rate and apply it to age group `65 to 100`.

## Experience

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/experience-condition.png" alt="Region Halland Pricelist" />

Like [Age Group](#age-group), this is a condition related to number of years/months. Only this time, we calculate the years of experience instead of the talent's age.
