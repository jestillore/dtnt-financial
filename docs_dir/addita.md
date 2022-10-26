# Addita Age Factor

When making a booking, the customer should be able to choose from different salary options or [Pricelists](/tnt/#pricelists) for the talents/suppliers the booking is sent out to:

1. [Manual entry or salary](#manual-entry) (should apply to all talents/suppliers)
2. [According to `age formula`](#age-formula) (where the talent gets paid according to his/her age)

Both options will ask the customer a desired invoice and salary rate.

> Take note that if set, the value will override whatever is in the session time pricelist rules.
> This will only override rules where [Time Calculation](/tnt/#time-calculation) is set to [Session Time](/tnt/#session-time)

## How do we calculate the base salary?

The goal is that the highest paid talent should give us minimum of `30%` contribution margin. That gives us `70%` as the total cost of talent.
The `70%` is inclusive of the talent's `hourly wage` + `vacation payment` + `the social expenses`.

I will not detail the computation here as it's not relevant to this document anymore. If you want to learn about how we calculate the hourly wage, please ping Johan.

Let's say the customer is willing to pay for `350kr` per hour. The `70%` for that is `245kr` and that makes the hourly rate for the highest paid talent to `166kr`.

## Deduction from the base Salary

Below is a table on how we will more likely categorize our talents based on age and how much we will deduct from the base salary per age group:

| Age Group          | Deduction | Hourly Rate |
|--------------------|-----------|-------------|
| 40 years and older | 0kr       | 166kr       |
| 36-39 years old    | 5kr       | 161kr       |
| 31-35 years old    | 10kr      | 156kr       |
| 27-30 years old    | 15kr      | 151kr       |
| 24-26 years old    | 20kr      | 146kr       |
| 21-23 years old    | 30kr      | 136kr       |
| 18-20 years old    | 40kr      | 126kr       |

## Let's Build the Pricelist

### Manual Entry

First, we create a pricelist and let's call it `Manual Entry Pricelist`

Next, we create a rule and let's call it `Flat Rate`

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | Flat Rate                          |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Interval](/tnt/#interval)         |
| Charging Start-End Minutes | 0-60                               |
| Invoice Code               | 711                                |
| Invoice Rate               | 0                                  |
| Salary Code                | 711                                |
| Salary Rate                | 0                                  |

> Notice that the `Invoice Rate` and `Salary Rate` are both zero. This is intentional because we want to force the customer to input the rates manually per booking.

And since we want this rule to apply to all bookings, we don't need to apply any conditions here.


### Age Formula

First, we create a pricelist and let's call it `Age Factor Pricelist`. This name should appear when creating a booking.

Next, we create multiple rules: one for each age group.

***

#### 40 years and older

[Pricelist Rule](/tnt/#rules)

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | Flat Rate for 40 years and older   |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Interval](/tnt/#interval)         |
| Charging Start-End Minutes | 0-60                               |
| Invoice Code               | 711                                |
| Invoice Rate               | 0                                  |
| Salary Code                | 711                                |
| Salary Rate                | 0                                  |

> We set the `Salary Rate` to zero because this age group are our highest paid talents.

[Age Group Condition](/conditions/#age-group)

| Description        | Minimum Age | Maximum Age |
|--------------------|-------------|-------------|
| 40 years and older | 40          | 120         |

***

#### 36-39 years old

[Pricelist Rule](/tnt/#rules)

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | Flat Rate for 36-39 years old      |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Interval](/tnt/#interval)         |
| Charging Start-End Minutes | 0-60                               |
| Invoice Code               | 711                                |
| Invoice Rate               | 0                                  |
| Salary Code                | 711                                |
| Salary Rate                | 5                                  |

> We set the `Salary Rate` to `5` because we want this age group to receive `5kr` less than our highest paid talents.

[Age Group Condition](/conditions/#age-group)

| Description     | Minimum Age | Maximum Age |
|-----------------|-------------|-------------|
| 36-39 years old | 36          | 39          |

***

#### 31-35 years old

[Pricelist Rule](/tnt/#rules)

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | Flat Rate for 31-35 years old      |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Interval](/tnt/#interval)         |
| Charging Start-End Minutes | 0-60                               |
| Invoice Code               | 711                                |
| Invoice Rate               | 0                                  |
| Salary Code                | 711                                |
| Salary Rate                | 10                                 |

> We set the `Salary Rate` to `10` because we want this age group to receive `10kr` less than our highest paid talents.

[Age Group Condition](/conditions/#age-group)

| Description     | Minimum Age | Maximum Age |
|-----------------|-------------|-------------|
| 31-35 years old | 31          | 35          |

***

#### 27-30 years old

[Pricelist Rule](/tnt/#rules)

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | Flat Rate for 27-30 years old      |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Interval](/tnt/#interval)         |
| Charging Start-End Minutes | 0-60                               |
| Invoice Code               | 711                                |
| Invoice Rate               | 0                                  |
| Salary Code                | 711                                |
| Salary Rate                | 15                                 |

> We set the `Salary Rate` to `15` because we want this age group to receive `15kr` less than our highest paid talents.

[Age Group Condition](/conditions/#age-group)

| Description     | Minimum Age | Maximum Age |
|-----------------|-------------|-------------|
| 27-30 years old | 27          | 30          |

***

#### 24-26 years old

[Pricelist Rule](/tnt/#rules)

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | Flat Rate for 24-26 years old      |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Interval](/tnt/#interval)         |
| Charging Start-End Minutes | 0-60                               |
| Invoice Code               | 711                                |
| Invoice Rate               | 0                                  |
| Salary Code                | 711                                |
| Salary Rate                | 20                                 |

> We set the `Salary Rate` to `20` because we want this age group to receive `20kr` less than our highest paid talents.

[Age Group Condition](/conditions/#age-group)

| Description     | Minimum Age | Maximum Age |
|-----------------|-------------|-------------|
| 24-26 years old | 24          | 26          |

***

#### 21-23 years old

[Pricelist Rule](/tnt/#rules)

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | Flat Rate for 21-23 years old      |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Interval](/tnt/#interval)         |
| Charging Start-End Minutes | 0-60                               |
| Invoice Code               | 711                                |
| Invoice Rate               | 0                                  |
| Salary Code                | 711                                |
| Salary Rate                | 30                                 |

> We set the `Salary Rate` to `30` because we want this age group to receive `30kr` less than our highest paid talents.

[Age Group Condition](/conditions/#age-group)

| Description     | Minimum Age | Maximum Age |
|-----------------|-------------|-------------|
| 21-23 years old | 21          | 23          |

***

#### 18-20 years old

[Pricelist Rule](/tnt/#rules)

| Field                      | Value                              |
|----------------------------|------------------------------------|
| Name                       | Flat Rate for 18-20 years old      |
| Charging Type              | [Currency](/tnt/#currency)         |
| Time Calculation           | [Session Time](/tnt/#session-time) |
| Charging Frequency         | [Interval](/tnt/#interval)         |
| Charging Start-End Minutes | 0-60                               |
| Invoice Code               | 711                                |
| Invoice Rate               | 0                                  |
| Salary Code                | 711                                |
| Salary Rate                | 40                                 |

> We set the `Salary Rate` to `40` because we want this age group to receive `40kr` less than our highest paid talents.

[Age Group Condition](/conditions/#age-group)

| Description     | Minimum Age | Maximum Age |
|-----------------|-------------|-------------|
| 18-20 years old | 18          | 20          |
