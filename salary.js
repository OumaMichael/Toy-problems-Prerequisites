// --- 1. Monthly PAYE Calculation ---
// Based on the following monthly tax brackets (effective 1 July 2023):
// • Bracket 1: GS ≤ 24,000 at 10%
// • Bracket 2: 24,001 ≤ GS ≤ 32,333 at 25%
// • Bracket 3: 32,334 ≤ GS ≤ 500,000 at 30%
// • Bracket 4: 500,001 ≤ GS ≤ 800,000 at 32.5%
// • Bracket 5: GS > 800,000 at 35%
// Reliefs (monthly):
// • Personal Relief: 2,400
// • Insurance Relief: 5,000
//
// The function computes the tax (T) piecewise then subtracts reliefs.
function calculateMonthlyPAYE(grossSalary) {
  let tax = 0;

  if (grossSalary <= 24000) {
    tax = grossSalary * 0.10;
  } else if (grossSalary <= 32333) {
    tax = (24000 * 0.10) + ((grossSalary - 24000) * 0.25);
  } else if (grossSalary <= 500000) {
    // Second bracket width: 32333 - 24000 = 8333
    tax = (24000 * 0.10) + (8333 * 0.25) + ((grossSalary - 32333) * 0.30);
  } else if (grossSalary <= 800000) {
    tax =
      (24000 * 0.10) +
      (8333 * 0.25) +
      ((500000 - 32333) * 0.30) +
      ((grossSalary - 500000) * 0.325);
  } else { // grossSalary > 800000
    tax =
      (24000 * 0.10) +
      (8333 * 0.25) +
      ((500000 - 32333) * 0.30) +
      ((800000 - 500000) * 0.325) +
      ((grossSalary - 800000) * 0.35);
  }

  // Apply monthly reliefs
  const totalRelief = 2400 + 5000;
  const netTax = Math.max(tax - totalRelief, 0);
  return netTax;
}

// --- 2. Monthly NSSF Deduction ---
// Under the NSSF Act (from February 2025 onwards), employee contributions:
// • Tier I: 6% on the first Ksh 8,000
// • Tier II: 6% on the amount between Ksh 8,001 and Ksh 72,000
function calculateMonthlyNSSF(basicSalary) {
  const tier1 = 0.06 * Math.min(basicSalary, 8000);
  let tier2 = 0;
  if (basicSalary > 8000) {
    tier2 = 0.06 * (Math.min(basicSalary, 72000) - 8000);
  }
  return tier1 + tier2;
}

// --- 3. Monthly SHIF (Social Health Insurance Fund) Deduction ---
// From 1 October 2024, SHIF is 2.75% of the gross salary.
function calculateSHIF(grossSalary) {
  return 0.0275 * grossSalary;
}

// --- 4. Monthly Housing Levy ---
// Effective from 19 March 2024, Housing Levy is 1.5% of the gross salary.
function calculateHousingLevy(grossSalary) {
  return 0.015 * grossSalary;
}

// --- 5. Monthly Net Salary Calculation ---
// Gross Salary (GS) = Basic Salary (BS) + Benefits (B)
// Then, Net Salary = GS − (PAYE + NSSF + SHIF + Housing Levy)
function calculateMonthlyNetSalary(basicSalary, benefits) {
  const grossSalary = basicSalary + benefits;
  const paye = calculateMonthlyPAYE(grossSalary);
  const nssf = calculateMonthlyNSSF(basicSalary);
  const shif = calculateSHIF(grossSalary);
  const housingLevy = calculateHousingLevy(grossSalary);
  const totalDeductions = paye + nssf + shif + housingLevy;
  const netSalary = grossSalary - totalDeductions;

  return {
    grossSalary,
    paye,
    nssf,
    shif,
    housingLevy,
    netSalary
  };
}

// --- 6. Annual Calculations ---
// Annual gross salary is 12 x monthly gross.
// Annual PAYE uses scaled-up tax brackets:
// • Bracket 1: Annual Gross ≤ 288,000 at 10%
// • Bracket 2: 288,001 ≤ Annual Gross ≤ 388,000 at 25%
// • Bracket 3: 388,001 ≤ Annual Gross ≤ 6,000,000 at 30%
// • Bracket 4: 6,000,001 ≤ Annual Gross ≤ 9,600,000 at 32.5%
// • Bracket 5: Annual Gross > 9,600,000 at 35%
// Annual reliefs:
// • Personal Relief: 28,800
// • Insurance Relief: 60,000
function calculateAnnualPAYE(annualGross) {
  let tax = 0;

  if (annualGross <= 288000) {
    tax = annualGross * 0.10;
  } else if (annualGross <= 388000) {
    tax = (288000 * 0.10) + ((annualGross - 288000) * 0.25);
  } else if (annualGross <= 6000000) {
    tax = (288000 * 0.10) + (100000 * 0.25) + ((annualGross - 388000) * 0.30);
  } else if (annualGross <= 9600000) {
    tax =
      (288000 * 0.10) +
      (100000 * 0.25) +
      ((6000000 - 388000) * 0.30) +
      ((annualGross - 6000000) * 0.325);
  } else {
    tax =
      (288000 * 0.10) +
      (100000 * 0.25) +
      ((6000000 - 388000) * 0.30) +
      ((9600000 - 6000000) * 0.325) +
      ((annualGross - 9600000) * 0.35);
  }

  const totalRelief = 28800 + 60000;
  const netTax = Math.max(tax - totalRelief, 0);
  return netTax;
}

// Annual NSSF, SHIF, and Housing Levy are 12 times their monthly amounts.
function calculateAnnualNetSalary(basicSalary, benefits) {
  // Calculate monthly values first
  const monthly = calculateMonthlyNetSalary(basicSalary, benefits);
  const grossAnnual = monthly.grossSalary * 12;
  const payeAnnual = calculateAnnualPAYE(grossAnnual);
  const nssfAnnual = calculateMonthlyNSSF(basicSalary) * 12;
  const shifAnnual = calculateSHIF(monthly.grossSalary) * 12;
  const housingLevyAnnual = calculateHousingLevy(monthly.grossSalary) * 12;
  const totalAnnualDeductions = payeAnnual + nssfAnnual + shifAnnual + housingLevyAnnual;
  const netAnnualSalary = grossAnnual - totalAnnualDeductions;

  return {
    grossAnnual,
    payeAnnual,
    nssfAnnual,
    shifAnnual,
    housingLevyAnnual,
    netAnnualSalary
  };
}

// --- Example Usage ---
const basicSalary = 50000;  
const benefits = 5000;    

// Monthly calculation
const monthlyResult = calculateMonthlyNetSalary(basicSalary, benefits);
console.log("Monthly Salary Breakdown:");
console.log(`Gross Salary: Ksh ${monthlyResult.grossSalary.toFixed(2)}`);
console.log(`PAYE: Ksh ${monthlyResult.paye.toFixed(2)}`);
console.log(`NSSF: Ksh ${monthlyResult.nssf.toFixed(2)}`);
console.log(`SHIF: Ksh ${monthlyResult.shif.toFixed(2)}`);
console.log(`Housing Levy: Ksh ${monthlyResult.housingLevy.toFixed(2)}`);
console.log(`Net Salary: Ksh ${monthlyResult.netSalary.toFixed(2)}`);

// Annual calculation
const annualResult = calculateAnnualNetSalary(basicSalary, benefits);
console.log("\nAnnual Salary Breakdown:");
console.log(`Gross Annual Salary: Ksh ${annualResult.grossAnnual.toFixed(2)}`);
console.log(`Annual PAYE: Ksh ${annualResult.payeAnnual.toFixed(2)}`);
console.log(`Annual NSSF: Ksh ${annualResult.nssfAnnual.toFixed(2)}`);
console.log(`Annual SHIF: Ksh ${annualResult.shifAnnual.toFixed(2)}`);
console.log(`Annual Housing Levy: Ksh ${annualResult.housingLevyAnnual.toFixed(2)}`);
console.log(`Net Annual Salary: Ksh ${annualResult.netAnnualSalary.toFixed(2)}`);
