# Talentemp Financial

## Pricelists

In the DT system, DT is acting as the supplier who has its own internal pool and a list of customers who have an agreement with DT.

And just like in DT, suppliers in TnT can also create pricelists for their different customers, their dear talents inside the internal pool, and even for their own suppliers.

In Talentemp, each pricelist is always tied to a service. And optionally, it can also be attached to a specific customer, supplier, or internal pool.

Here's an overview:

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/tnt-pricelists-overview.png" alt="Region Halland Pricelist" />

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/new-tnt-pricelist.png" alt="Region Halland Pricelist" />

## Rules

In DT, we have specific types of charges like `Charging`, `Travel`, `OB`, etc. In Talentemp, we try to be as dynamic as possible when it comes to charging because we have a wide variety of services provided.

As a general rule, anything that charges the customer or anything that pays the talent is a pricelist rule.

A pricelist rule is a set of conditions to which when everything is met, will apply a charge to either invoice or salary or even both.

Here's an overview of what a pricelist rule will look like:

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/tnt-rules-overview.png" alt="Region Halland Pricelist" />

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/tnt-rule-info.png" alt="Region Halland Pricelist" />

### Pricelist Rule Description

#### Name
A name is a description of the rule. In this example, we are creating a rule on how we charge and pay our talents when the booking falls on a weekday, and it's daytime.

#### Group
I will explain this in [Playground](/playground/#the-weekend-or-minor-holiday-flow).

#### Charging Type
Currently, we have 3 different charging type. `Currency`, `Currency Base Deduction` (I will need a better name for this soon), and `Percentage`

##### Currency
We will pick `Currency` if we charge the customer or pay the talent a specific amount. Let's say, during weekday daytime, I will charge the customer `200kr` and pay the talent `100kr` per hour.

##### Currency Base Deduction
I will actually need a better name for this soon. But let me just described this for now.
A currency base deduction is an implementation of the age-formula requested on Addita.

Let's say that the customer wants to pay for `350kr` per hour during weekday daytime. To calculate the highest amount Addita will pay the talent, we have to ensure `30%` profit first. The remaining amount will be subtracted with the vacation payment and social expenses.

All in all, that leaves us with `166kr` per hour for our highest paid talents. Now, our `base currency` is `166kr`. Next, we define what will be the deduction for this rule. Please take a look at [Salary Rate](#salary-rate)

To better understand the deduction, here's an except from the Addita age-formula document.

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/addita-age-formula.png" alt="Region Halland Pricelist" />

> This charging type is only for salary. So when this is selected for the rule, the invoice charging type will be automatically considered as [Currency](#currency) and the amount will be taken from [Invoice Rate](#invoice-rate) or from the booking itself if specified.

##### Percentage
We pick `Percentage` type if we only want to pay an additional amount on top of a rule or a set of rules. An example for this is a night Bonus.

Let's say that if the booking falls between `10PM` to `4AM`, I will pay an extra of 30% to what's charged on the `Weekday Rule`.

> Take note that I only said `Weekday Rule` instead of `Weekday Daytime Rule` because in this case, we have a flat rate for all our bookings regardless of the time, and we just pay an extra if it falls on a specific time.

#### Charging Frequency
Charging frequency describes how often and when should we charge our customers and pay our talents. Currently, we have 3 types.

##### One Time
We pick one time if we only apply this rule once without consideration on whether how long the booking lasted or how much travel was done. This is useful if we only want to charge our customers transaction fees just by creating a booking. Or maybe different transaction fees for different service questions.

If we pick `One Time` frequency, [Time Calculation](#time-calculation) will be disabled and the value will be ignored during calculation.

##### Interval
Probably the most common charging frequency to be picked. Interval is when we want to charge our customers or pay our talents at a specific interval.

One example is like we charge our customers `350kr` per hour. If this frequency is picked, the value inside [Charging Start-End Minutes](#charging-start-end-minutes) must be set to `0-60` minutes to denote that this is an hourly interval.

Otherwise, if the interval is every half hour, the value should be `0-30`.

##### Range
`Range` is used if the prices are different for each time range. In interval, every 30 minutes pays the same `175kr`. So if the booking is for 1 hour, the charge would be `350kr`.

But that's not always the case. Sometimes, we pay the talent `175kr` for the first `30 minutes`. And the next 30 minutes, we will pay `150kr`. So if the booking is 1 hour, the charge would only be `325kr`.
And every 5 minutes after the first hour, we will pay them `30kr` per instance. This is called `Parts` in DT Financial.

So if we pick range, we are going to create at least 3 rules for the scenario I described above. And here's how it will look like:

| Charging Type         | Time Calculation              | Charging Frequency | Start-End Minutes | Offset Minutes | Invoice Rate |
|-----------------------|-------------------------------|--------------------|-------------------|----------------|--------------|
| [Currency](#currency) | [Session Time](#session-time) | [Range](#range)    | 0-30              | 0              | 175          |
| [Currency](#currency) | [Session Time](#session-time) | [Range](#range)    | 31-60             | 0              | 150          |
| [Currency](#currency) | [Session Time](#session-time) | [Interval](#range) | 0-5               | 60             | 30           |

More information on how to assemble this will be described in the [Playground](/playground).

#### Time Calculation
When charging frequency is set to [Interval](#interval) or [Range](#range), we also have to tell the rule which time are we going to calculate it from. Or how much time we have to apply for this rule.

The possible values for this are: [Urgent](#urgent), [Session Time](#session-time), [Creation To Start](#creation-to-start), and [Travel Time](#travel-time)

##### Urgent
This will be picked if we want to charge for bookings that are marked as urgent. This will only be charged once regardless of the value in [Charging Frequency](#charging-frequency)

##### Session Time
This calculates the length of the booking.

##### Creation To Start
This calculates the distance between the start of the booking and when the booking was created. This is useful if we want to charge for bookings created just 30 minutes before the start time.

##### Travel Time
This calculates the length of travel done by the talent.

#### Charging Offset in Minutes
Sometimes, there are agreements like we will reimburse the talent for their travel after the first 30 minutes. So if the talent traveled for 1 hour, the talent will be reimbursed for 30 minutes.

If that's the case, the value for this field should be `30`.

#### Charging Start-End Minutes
Possible values for this field are described in [Interval](#interval) and [Range](#range)

#### Rules to Calculate the Percentage From
This field is only enabled when the [Charging Type](#charging-type) is set to [Percentage](#percentage). This will hold the list of the pricelist rules.

#### Invoice Charging

##### Invoice Code
This is also called as `Konto` in DT financial. I think Virpal or Jarre can explain this better than I do. Just think of this as a unique identifier for a specific charge.

##### Invoice Rate
The value for this is dependent on the [Charging Type](#charging-type) selected.

If the charging type is [Currency](#currency), the value should be the specific amount to be charge.

If the charging type is [Percentage](#percentage), the value should be the rate in decimal form. So if you want to charge for `30%`, set the value to `30`.

#### Salary Charging

##### Salary Code
This is also called as `Löneart` in DT financial. This is the salary equivalent for `Konto`. A unique identifier for the talent's salary charge.

##### Salary Rate
The value for this is dependent on the [Charging Type](#charging-type) selected.

If the charging type is [Currency](#currency), the value should be the specific amount to be charge.

If the charging type is [Currency Base Deduction](#currency-base-deduction), the value should be the amount to be deducted from the highest salary (base currency). The calculation for the highest salary is described in [Currency Base Deduction](#currency-base-deduction) section.

If the charging type is [Percentage](#percentage), the value should be the rate in decimal form. So if you want to charge for `30%`, set the value to `30`.
