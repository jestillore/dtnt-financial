# DigitalTolk Financial

## Pricelists
In DT Financial, we have a feature called pricelists where we house all money-related aspects of the system. In most cases, one customer will only have one pricelist.
The pricelists can be linked to municipality, company, or department.

In some cases, other customers also have multiple pricelists -- one for each language and another pricelist for all the languages not specifically defined.

Here is an example of a pricelist for a municipality called `Region Halland`.

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/halland-pricelist.png" alt="Region Halland Pricelist" />

Inside that pricelist, this is what it looks like:

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/inside-dt-pricelist.png" alt="Region Halland Pricelist" />

### Charges

We have multiple charges for session time (`Charging`), transaction fees, inconvenience (`OB`) charges, travel reimbursements, etc.
And if you notice, we have difference prices for `phone` and `physical` types.

We also have separate sections for invoice and salary.

We're doing it like this in DT because we only offer one service. And that's the `Interpretation Service`. And we already know what are the necessary charges for that type of service.

## Relating to Talentemp

In DT, every booking has a type. It could be `phone`, `physical`, `video`, etc. In Talentemp, we don't have that one.
Instead, we have service questions that are unique to each service.

So if we are going to relate a phone booking in DT to Talentemp, it will look like this:

<img src="https://gitlab.digitaltolk.com/ejillberth/dt-tnt-financial/-/raw/main/new-tnt-booking.png" alt="Region Halland Pricelist" />
