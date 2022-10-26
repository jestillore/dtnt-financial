# Let's Play!

## The Simplest Flow
This flow is about paying a flat rate for all our `Customer Service` employees.

The salary rate will be `300kr` per hour.

First, we create a pricelist for `Customer Service` and we link it to our internal pool. We don't need to link to any customers because we are the customer.

Second, we create a rule and let's call it `Weekday Daytime Rate`.

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | Weekday Daytime Rate               |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Interval](/tnt/#interval)         |
| Charging Start-End Minutes | 0-60                               |
| Salary Code                | 711                                |
| Salary Rate                | 350                                |

And then we apply this rule to [Timings](/conditions/#timings) condition.

| Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday | Time          |
|--------|---------|-----------|----------|--------|----------|--------|---------------|
| Yes    | Yes     | Yes       | Yes      | Yes    | No       | No     | 08:00 - 18:00 |

Since we don't let our talents work at night and on the weekend, we don't need to create another rules for them.
***

## The Parts Charging Flow
In this flow, we are going to emulate the parts charging in DT financial.

Here's the charging rule:

- For the 1st 30 minutes of the booking, we are going to pay the talent `300kr`
- The next 30 minutes, we are going to pay the talent `275kr` on top of the `300kr` (from the first 30 minutes)
- After the first 60 minutes, we are going to pay the talent `50kr` on top of the `575kr` for every 5 minutes in excess.
- This rate is effective `24/7`
- On the weekend, we will pay the talent an extra `10%` if the booking falls on a weekend.

First, we create a pricelist for `Customer Service` and link it to our internal pool.

Second, we create a rule for the first 30 minutes and let's call it `First 30 Minutes`.

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | First 30 Minutes                   |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Range](/tnt/#range)               |
| Charging Start-End Minutes | 0-30                               |
| Salary Code                | 711                                |
| Salary Rate                | 300                                |

And then, we apply this rule to [Timings](/conditions/#timings) condition so it will be executed in regardless of the day and time the booking falls in.

| Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday | Time          |
|--------|---------|-----------|----------|--------|----------|--------|---------------|
| Yes    | Yes     | Yes       | Yes      | Yes    | Yes      | Yes    | 00:00 - 23:59 |

Next, we create another rule for the next 30 minutes and let's call it `After the First 30 Minutes`.

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | After the First 30 Minutes         |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Range](/tnt/#range)               |
| Charging Start-End Minutes | 31-60                              |
| Salary Code                | 711                                |
| Salary Rate                | 275                                |

And then, we apply this rule to [Timings](/conditions/#timings) condition so it will be executed in regardless of the day and time the booking falls in.

| Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday | Time          |
|--------|---------|-----------|----------|--------|----------|--------|---------------|
| Yes    | Yes     | Yes       | Yes      | Yes    | Yes      | Yes    | 00:00 - 23:59 |

Moreover, we create another rule for the extra 5 minutes after the first hour and let's call it `Every 5 Minutes After the First Hour`

Now, this rule will be different from the first two because the [Charging Frequency](/tnt/#charging-frequency) will be set to [Interval](/tnt/#interval).

We will also define the [Offset](/tnt/#charging-offset-in-minutes) value because we will skip the first hour from this interval as it is presumably already paid.

| Field                      | Value                                |
|----------------------------|--------------------------------------|
| Name                       | Every 5 Minutes After the First Hour |
| Charging Type              | [Currency](/tnt/#currency)           |
| Time Calculation           | [Session Time](/tnt/#session-time)   |
| Charging Frequency         | [Interval](/tnt/#interval)           |
| Charging Start-End Minutes | 0-5                                  |
| Charging Offset in Minutes | 60                                   |
| Salary Code                | 711                                  |
| Salary Rate                | 50                                   |

And then, we apply this rule to [Timings](/conditions/#timings) condition so it will be executed in regardless of the day and time the booking falls in.

| Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday | Time          |
|--------|---------|-----------|----------|--------|----------|--------|---------------|
| Yes    | Yes     | Yes       | Yes      | Yes    | Yes      | Yes    | 00:00 - 23:59 |

Lastly, we will create another rule for the weekend extra pay and let's call it `Weekend Bonus`

| Field                                  | Value                                                                                    |
|----------------------------------------|------------------------------------------------------------------------------------------|
| Name                                   | Weekend Bonus                                                                            |
| Charging Type                          | [Percentage](/tnt/#percentage)                                                           |
| Time Calculation                       | [Session Time](/tnt/#session-time)                                                       |
| Rules to Calculate the Percentage From | `First 30 Minutes`, `After the First 30 Minutes`, `Every 5 Minutes After the First Hour` |
| Salary Code                            | 711                                                                                      |
| Salary Rate                            | 10                                                                                       |

And then, we apply this rule to [Timings](/conditions/#timings) condition so it will be executed only on weekends but regardless of the time the booking falls in.

| Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday | Time          |
|--------|---------|-----------|----------|--------|----------|--------|---------------|
| No     | No      | No        | No       | No     | Yes      | Yes    | 00:00 - 23:59 |

> Notice that the `Weekend Bonus` rule has an extra field called [Rules to Calculate the Percentage From](/tnt/#rules-to-calculate-the-percentage-from) and its value is the first the rules that we created to implement the Parts Charging Flow.
> This means that if a booking falls in a weekend, we sum the charges created for these 3 rules, and we apply 10% of it and add it as another charge.

***

## The Not-So-Simplest Flow

Let's extend our [Simplest Flow](#the-simplest-flow) and another rate if the booking falls in the evening.
This time, we're paying our talents `400kr` per hour.

Under the same pricelist that we created in [The Simplest Flow](#the-simplest-flow), we create another rule and let's call it `Weekday Evening Rate`.

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | Weekday Evening Rate               |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Interval](/tnt/#interval)         |
| Charging Start-End Minutes | 0-60                               |
| Salary Code                | 711                                |
| Salary Rate                | 400                                |

And then we apply this rule to [Timings](/conditions/#timings) condition.

| Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday | Time          |
|--------|---------|-----------|----------|--------|----------|--------|---------------|
| Yes    | Yes     | Yes       | Yes      | Yes    | No       | No     | 18:01 - 23:00 |

Now if the booking falls on weekday from `6:01 PM` to `11:00 PM`, we are paying our talents a higher rate than what we usually pay during the daytime.

***

## The Booking Type Flow
In this flow, we will attempt to replicate DT financial paying for different prices per booking type.

The service will be called `Interpretation`. It has one service question called `Booking Type` and that question has two possible options: `Phone` and `Physical`.

For `Phone` bookings, we will pay `350kr` per hour while we pay `400kr` per hour for the `Physical` booking.

First, we create a pricelist for the `Interpretation` service and link it to our internal pool.

Next, we'll create a rule for the `Phone` booking and let's call it `Phone Booking Rate`.

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | Phone Booking Rate                 |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Interval](/tnt/#interval)         |
| Charging Start-End Minutes | 0-60                               |
| Salary Code                | 711                                |
| Salary Rate                | 350                                |

And then we apply this rule to [Service Question Answers](/conditions/#service-question-answers) condition.

| Service Question | Answers |
|------------------|---------|
| Booking Type     | Phone   |

Lastly, we create another rule for the `Physical` booking and let's call it `Physical Booking Rate`.

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | Physical Booking Rate              |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Interval](/tnt/#interval)         |
| Charging Start-End Minutes | 0-60                               |
| Salary Code                | 711                                |
| Salary Rate                | 400                                |

And then we apply this rule to [Service Question Answers](/conditions/#service-question-answers) condition.

| Service Question | Answers  |
|------------------|----------|
| Booking Type     | Physical |

***

## The Weekend or Minor Holiday Flow
In this flow we will avoid duplication of charges from similar pricelist rules. The way we can accomplish that is by using the [Pricelist Rule Group](/tnt/#group).

The scenario would be that:

- If the booking falls on a minor holiday, we will give the talent a bonus of `250kr` one time.
- If the booking falls on a weekend, we will give the talent a bonus of `200kr` one time.

Now, it's easy, we create one rule for the minor holiday and we create one rule for the weekend.

But what happens if the booking falls on a weekend that is also a minor holiday? Correct! It will create two charges. But we don't want that, do we?

This is where [Pricelist Rule Group](/tnt/#group) comes into play. [Pricelist Rule Group](/tnt/#group) that only one of its member rules will be charged (whichever is highest among them).

While creating two rules described above is correct, we also have to group into one to make sure that we will not be charged twice.

First, create a new `Pricelist Rule Group` and name it `Weekend or Minor Holiday Group`.

Next, create a rule for the minor holiday and make it a member of the `Weekend or Minor Holiday Group`.

And then, create another rule for the weekend and make it a member of the same group.
