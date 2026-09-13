/**
 * Mock Test Scenario Generator — Phase 2
 * Generates 150 realistic daily-life test scenarios for the Zero-Trust AI Agent.
 * Each scenario includes: scenario_name, mock_masked_dom, mock_redaction_legend,
 * and a dummy 1x1 pixel base64 image.
 *
 * Run: npx ts-node generateMocks.ts
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// A minimal valid 1x1 transparent PNG in base64 (used as a dummy image).
const DUMMY_BASE64_IMAGE =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAA0lEQVQI12P4z8BQDwAEgAF/QualIQAAAABJRU5ErkJggg==';

export interface MockScenario {
  scenario_name: string;
  mock_masked_dom: string;
  mock_redaction_legend: Array<{ id: string; type: string; bbox: number[] }>;
  mock_image_base64: string;
}

const SCENARIO_TEMPLATES: Array<{ name: string; dom: string; legend: MockScenario['mock_redaction_legend'] }> = [  // --- Government / Tax (1-10) ---
  { name: 'Filing IRS tax form 1040', dom: '<form><input type="text" name="ssn" value="***-**-****" /><button>Submit</button></form>', legend: [{ id: 'R1', type: 'ssn', bbox: [10, 10, 200, 30] }] },
  { name: 'Paying property tax online', dom: '<div><input name="Property ID" value="PROP-****" /><input name="Amount" value="?*****" /><button>Pay Now</button></div>', legend: [{ id: 'R1', type: 'property_id', bbox: [10, 10, 150, 25] }] },
  { name: 'Applying for Aadhaar update', dom: '<form><input name="aadhaar" value="**** **** ****" /><input name="name" value="REDACTED" /><button>Verify OTP</button></form>', legend: [{ id: 'R1', type: 'aadhaar', bbox: [10, 10, 200, 30] }] },
  { name: 'PAN card application status check', dom: '<div><input name="pan" value="**** *****" /><button>Check Status</button><p>Status: Under Review</p></div>', legend: [{ id: 'R1', type: 'pan', bbox: [10, 10, 150, 25] }] },
  { name: 'Filing GST return', dom: '<form><input name="gstin" value="** **** **** ****" /><input name="turnover" value="?*****" /><button>File Return</button></form>', legend: [{ id: 'R1', type: 'gstin', bbox: [10, 10, 200, 30] }] },
  { name: 'Income tax e-verification', dom: '<div><p>Aadhaar: **** **** ****</p><button>Verify via Aadhaar</button><button>Verify via Bank</button></div>', legend: [{ id: 'R1', type: 'aadhaar', bbox: [10, 10, 200, 20] }] },
  { name: 'Voter ID registration', dom: '<form><input name="name" value="REDACTED" /><input name="dob" value="**/**/****" /><input name="address" value="REDACTED" /><button>Submit</button></form>', legend: [{ id: 'R1', type: 'name', bbox: [10, 10, 150, 25] }, { id: 'R2', type: 'dob', bbox: [10, 45, 150, 25] }] },
  { name: 'Driving license renewal', dom: '<div><input name="dl_number" value="DL-**********" /><button>Renew</button><p>Fee: ?*****</p></div>', legend: [{ id: 'R1', type: 'dl_number', bbox: [10, 10, 200, 25] }] },
  { name: 'Passport application tracking', dom: '<div><input name="file_number" value="********" /><button>Track</button></div>', legend: [{ id: 'R1', type: 'file_number', bbox: [10, 10, 150, 25] }] },
  { name: 'Municipal water tax payment', dom: '<form><input name="connection_id" value="WT-****" /><input name="amount" value="?****" /><button>Pay</button></form>', legend: [{ id: 'R1', type: 'connection_id', bbox: [10, 10, 150, 25] }] },  // --- Travel / Transport (11-25) ---
  { name: 'Booking IRCTC train ticket', dom: '<form><input name="from" value="NDLS" /><input name="to" value="BCT" /><input name="date" value="**/**/****" /><button>Search Trains</button></form>', legend: [{ id: 'R1', type: 'journey_date', bbox: [10, 50, 150, 25] }] },
  { name: 'Flight booking on MakeMyTrip', dom: '<div><input name="origin" value="DEL" /><input name="dest" value="BOM" /><input name="depart" value="**/**/****" /><button>Search Flights</button></div>', legend: [{ id: 'R1', type: 'depart_date', bbox: [10, 50, 150, 25] }] },
  { name: 'Bus ticket booking on RedBus', dom: '<form><input name="from" value="Bangalore" /><input name="to" value="Chennai" /><input name="date" value="**/**/****" /><button>Search Buses</button></form>', legend: [{ id: 'R1', type: 'travel_date', bbox: [10, 50, 150, 25] }] },
  { name: 'Hotel booking on Goibibo', dom: '<div><input name="city" value="Goa" /><input name="checkin" value="**/**/****" /><input name="checkout" value="**/**/****" /><button>Search Hotels</button></div>', legend: [{ id: 'R1', type: 'checkin', bbox: [10, 30, 150, 25] }, { id: 'R2', type: 'checkout', bbox: [10, 60, 150, 25] }] },
  { name: 'Uber cab booking', dom: '<div><input name="pickup" value="REDACTED" /><input name="drop" value="REDACTED" /><button>Confirm UberGo</button></div>', legend: [{ id: 'R1', type: 'pickup', bbox: [10, 10, 200, 25] }, { id: 'R2', type: 'drop', bbox: [10, 45, 200, 25] }] },
  { name: 'Ola auto booking', dom: '<form><input name="from" value="REDACTED" /><input name="to" value="REDACTED" /><button>Book Auto</button></form>', legend: [{ id: 'R1', type: 'from', bbox: [10, 10, 200, 25] }] },
  { name: 'Railway platform ticket', dom: '<div><input name="station" value="NDLS" /><button>Buy ?10 Ticket</button></div>', legend: [] },
  { name: 'Metro card recharge', dom: '<form><input name="card_no" value="**** **** ****" /><input name="amount" value="?****" /><button>Recharge</button></form>', legend: [{ id: 'R1', type: 'card_no', bbox: [10, 10, 200, 25] }] },
  { name: 'FASTag recharge', dom: '<div><input name="vehicle" value="KA-**-****" /><input name="amount" value="?****" /><button>Recharge</button></div>', legend: [{ id: 'R1', type: 'vehicle', bbox: [10, 10, 150, 25] }] },
  { name: 'Airport check-in online', dom: '<form><input name="pnr" value="******" /><input name="last_name" value="REDACTED" /><button>Check In</button></form>', legend: [{ id: 'R1', type: 'pnr', bbox: [10, 10, 100, 25] }] },
  { name: 'Visa application form', dom: '<form><input name="passport" value="**********" /><input name="dob" value="**/**/****" /><button>Submit</button></form>', legend: [{ id: 'R1', type: 'passport', bbox: [10, 10, 150, 25] }, { id: 'R2', type: 'dob', bbox: [10, 45, 150, 25] }] },
  { name: 'Domestic flight web check-in', dom: '<div><input name="pnr" value="******" /><input name="email" value="***@***.com" /><button>Next</button></div>', legend: [{ id: 'R1', type: 'email', bbox: [10, 45, 200, 25] }] },
  { name: 'Train PNR status check', dom: '<div><input name="pnr" value="**********" /><button>Get Status</button></div>', legend: [{ id: 'R1', type: 'pnr', bbox: [10, 10, 150, 25] }] },
  { name: 'Cancel bus ticket', dom: '<form><input name="ticket_id" value="TB-********" /><button>Cancel</button></form>', legend: [{ id: 'R1', type: 'ticket_id', bbox: [10, 10, 150, 25] }] },
  { name: 'Reschedule flight', dom: '<div><input name="booking_ref" value="********" /><input name="new_date" value="**/**/****" /><button>Reschedule</button></div>', legend: [{ id: 'R1', type: 'booking_ref', bbox: [10, 10, 150, 25] }] },  // --- Banking / Finance (26-45) ---
  { name: 'Paying credit card bill', dom: '<form><input name="card" value="**** **** **** ****" /><input name="amount" value="?*****" /><button>Pay Now</button></form>', legend: [{ id: 'R1', type: 'card', bbox: [10, 10, 200, 25] }] },
  { name: 'NEFT fund transfer', dom: '<div><input name="account" value="************" /><input name="ifsc" value="****000****" /><input name="amount" value="?*****" /><button>Transfer</button></div>', legend: [{ id: 'R1', type: 'account', bbox: [10, 10, 200, 25] }, { id: 'R2', type: 'ifsc', bbox: [10, 45, 150, 25] }] },
  { name: 'IMPS money transfer', dom: '<form><input name="mobile" value="******.****" /><input name="amount" value="?****" /><button>Send</button></form>', legend: [{ id: 'R1', type: 'mobile', bbox: [10, 10, 150, 25] }] },
  { name: 'UPI payment via Google Pay', dom: '<div><input name="upi" value="***@***" /><input name="amount" value="?****" /><button>Pay</button></div>', legend: [{ id: 'R1', type: 'upi', bbox: [10, 10, 150, 25] }] },
  { name: 'Fixed deposit creation', dom: '<form><input name="amount" value="?*****" /><input name="tenure" value="** years" /><button>Create FD</button></form>', legend: [{ id: 'R1', type: 'amount', bbox: [10, 10, 150, 25] }] },
  { name: 'Recurring deposit setup', dom: '<div><input name="monthly" value="?****" /><input name="rd_tenure" value="** months" /><button>Setup RD</button></div>', legend: [{ id: 'R1', type: 'monthly', bbox: [10, 10, 150, 25] }] },
  { name: 'Loan EMI payment', dom: '<form><input name="loan_account" value="LN-**********" /><input name="emi" value="?*****" /><button>Pay EMI</button></form>', legend: [{ id: 'R1', type: 'loan_account', bbox: [10, 10, 200, 25] }] },
  { name: 'KYC update on banking portal', dom: '<div><input name="aadhaar" value="**** **** ****" /><input name="pan" value="**** *****" /><button>Update KYC</button></div>', legend: [{ id: 'R1', type: 'aadhaar', bbox: [10, 10, 200, 25] }, { id: 'R2', type: 'pan', bbox: [10, 45, 150, 25] }] },
  { name: 'Debit card PIN generation', dom: '<form><input name="card" value="**** **** **** ****" /><button>Generate PIN</button></form>', legend: [{ id: 'R1', type: 'card', bbox: [10, 10, 200, 25] }] },
  { name: 'Cheque book request', dom: '<div><input name="account" value="************" /><button>Request 25 Leaves</button></div>', legend: [{ id: 'R1', type: 'account', bbox: [10, 10, 200, 25] }] },
  { name: 'Account statement download', dom: '<form><input name="from" value="**/**/****" /><input name="to" value="**/**/****" /><button>Download PDF</button></form>', legend: [{ id: 'R1', type: 'from', bbox: [10, 10, 150, 25] }, { id: 'R2', type: 'to', bbox: [10, 45, 150, 25] }] },
  { name: 'Block lost credit card', dom: '<div><input name="card" value="**** **** **** ****" /><button>Block Card</button></div>', legend: [{ id: 'R1', type: 'card', bbox: [10, 10, 200, 25] }] },
  { name: 'Credit limit increase request', dom: '<form><input name="current_limit" value="?*****" /><input name="requested" value="?*****" /><button>Submit</button></form>', legend: [{ id: 'R1', type: 'current_limit', bbox: [10, 10, 150, 25] }] },
  { name: 'Mutual fund SIP registration', dom: '<div><input name="fund" value="HDFC Equity" /><input name="sip_amount" value="?****" /><button>Start SIP</button></div>', legend: [{ id: 'R1', type: 'sip_amount', bbox: [10, 45, 150, 25] }] },
  { name: 'Buy insurance policy', dom: '<form><input name="name" value="REDACTED" /><input name="age" value="**" /><input name="sum_assured" value="?*****" /><button>Buy</button></form>', legend: [{ id: 'R1', type: 'name', bbox: [10, 10, 150, 25] }] },
  { name: 'Pay life insurance premium', dom: '<div><input name="policy" value="LI-**********" /><input name="premium" value="?*****" /><button>Pay</button></div>', legend: [{ id: 'R1', type: 'policy', bbox: [10, 10, 200, 25] }] },
  { name: 'File insurance claim', dom: '<form><input name="claim_id" value="CL-********" /><input name="amount" value="?*****" /><button>File Claim</button></form>', legend: [{ id: 'R1', type: 'claim_id', bbox: [10, 10, 200, 25] }] },
  { name: 'Link Aadhaar to bank account', dom: '<div><input name="account" value="************" /><input name="aadhaar" value="**** **** ****" /><button>Link</button></div>', legend: [{ id: 'R1', type: 'account', bbox: [10, 10, 200, 25] }, { id: 'R2', type: 'aadhaar', bbox: [10, 45, 200, 25] }] },
  { name: 'Open new savings account', dom: '<form><input name="name" value="REDACTED" /><input name="mobile" value="******.****" /><input name="pan" value="**** *****" /><button>Open Account</button></form>', legend: [{ id: 'R1', type: 'name', bbox: [10, 10, 150, 25] }, { id: 'R2', type: 'mobile', bbox: [10, 45, 150, 25] }] },  // --- E-Commerce (46-65) ---
  { name: 'Ordering on Amazon', dom: '<div><input name="address" value="REDACTED" /><input name="pincode" value="******" /><button>Deliver to this address</button></div>', legend: [{ id: 'R1', type: 'address', bbox: [10, 10, 250, 25] }] },
  { name: 'Flipkart mobile recharge', dom: '<form><input name="mobile" value="******.****" /><input name="operator" value="Jio" /><input name="amount" value="?***" /><button>Recharge</button></form>', legend: [{ id: 'R1', type: 'mobile', bbox: [10, 10, 150, 25] }] },
  { name: 'Myntra clothing purchase', dom: '<div><select><option>M</option><option>L</option></select><button>Add to Cart</button><button>Buy Now</button></div>', legend: [] },
  { name: 'Adding product to cart', dom: '<div><p>Wireless Mouse</p><p>?***</p><button>Add to Cart</button></div>', legend: [{ id: 'R1', type: 'price', bbox: [10, 30, 80, 20] }] },
  { name: 'Applying coupon code', dom: '<form><input name="coupon" value="SAVE**" /><button>Apply</button></form>', legend: [{ id: 'R1', type: 'coupon', bbox: [10, 10, 100, 25] }] },
  { name: 'COD order placement', dom: '<div><input name="name" value="REDACTED" /><input name="phone" value="******.****" /><button>Place Order</button></div>', legend: [{ id: 'R1', type: 'phone', bbox: [10, 45, 150, 25] }] },
  { name: 'Return request on Amazon', dom: '<form><input name="order_id" value="***-********-********" /><select><option>Damaged</option></select><button>Request Return</button></form>', legend: [{ id: 'R1', type: 'order_id', bbox: [10, 10, 200, 25] }] },
  { name: 'Track shipment', dom: '<div><input name="awb" value="**********" /><button>Track</button></div>', legend: [{ id: 'R1', type: 'awb', bbox: [10, 10, 150, 25] }] },
  { name: 'Write product review', dom: '<form><textarea name="review" value="REDACTED"></textarea><button>Submit Review</button></form>', legend: [{ id: 'R1', type: 'review', bbox: [10, 10, 300, 100] }] },
  { name: 'Seller registration', dom: '<div><input name="gst" value="** **** **** ****" /><input name="pan" value="**** *****" /><button>Register</button></div>', legend: [{ id: 'R1', type: 'gst', bbox: [10, 10, 200, 25] }] },
  { name: 'Gift card purchase', dom: '<form><input name="recipient_email" value="***@***.com" /><input name="amount" value="?****" /><button>Buy Gift Card</button></form>', legend: [{ id: 'R1', type: 'email', bbox: [10, 10, 200, 25] }] },
  { name: 'Pre-book new launch phone', dom: '<div><p>iPhone 16</p><button>Pre-book</button><p>?*****</p></div>', legend: [{ id: 'R1', type: 'price', bbox: [10, 50, 80, 20] }] },
  { name: 'Exchange old device', dom: '<form><input name="imei" value="***************" /><button>Get Exchange Value</button></form>', legend: [{ id: 'R1', type: 'imei', bbox: [10, 10, 200, 25] }] },
  { name: 'Subscribe to Amazon Prime', dom: '<div><button>Start 30-day Trial</button><button>Join Prime ?****/year</button></div>', legend: [{ id: 'R1', type: 'price', bbox: [10, 40, 200, 25] }] },
  { name: 'Cancel subscription', dom: '<div><p>Subscription: Active</p><button>Cancel</button></div>', legend: [] },
  { name: 'Add item to wishlist', dom: '<div><p>Bluetooth Speaker</p><button>? Add to Wishlist</button></div>', legend: [] },
  { name: 'Price drop alert setup', dom: '<form><input name="target_price" value="?****" /><button>Set Alert</button></form>', legend: [{ id: 'R1', type: 'target_price', bbox: [10, 10, 150, 25] }] },
  { name: 'Bulk order for business', dom: '<div><input name="company" value="REDACTED" /><input name="gst" value="** **** **** ****" /><button>Get Quote</button></div>', legend: [{ id: 'R1', type: 'gst', bbox: [10, 45, 200, 25] }] },
  { name: 'EMI option at checkout', dom: '<form><select><option>3 months</option><option>6 months</option></select><button>Pay with EMI</button></form>', legend: [] },
  { name: 'Contact customer support', dom: '<div><textarea name="issue" placeholder="Describe your issue"></textarea><button>Chat Now</button></div>', legend: [] },  // --- Healthcare (66-80) ---
  { name: 'Book doctor appointment on Practo', dom: '<form><input name="name" value="REDACTED" /><input name="phone" value="******.****" /><button>Book Appointment</button></form>', legend: [{ id: 'R1', type: 'phone', bbox: [10, 45, 150, 25] }] },
  { name: 'Order medicine on 1mg', dom: '<div><input name="medicine" value="Paracetamol" /><input name="prescription" value="REDACTED" /><button>Order</button></div>', legend: [{ id: 'R1', type: 'prescription', bbox: [10, 45, 200, 25] }] },
  { name: 'Lab test booking', dom: '<form><input name="test" value="Complete Blood Count" /><input name="patient" value="REDACTED" /><button>Book Test</button></form>', legend: [{ id: 'R1', type: 'patient', bbox: [10, 45, 150, 25] }] },
  { name: 'Download vaccination certificate', dom: '<div><input name="beneficiary" value="**********" /><button>Download Certificate</button></div>', legend: [{ id: 'R1', type: 'beneficiary', bbox: [10, 10, 150, 25] }] },
  { name: 'Telemedicine consultation', dom: '<div><button>Start Video Call</button><p>Dr. REDACTED</p></div>', legend: [{ id: 'R1', type: 'doctor_name', bbox: [10, 40, 150, 20] }] },
  { name: 'Health insurance claim', dom: '<form><input name="policy" value="HI-**********" /><input name="hospital" value="REDACTED" /><button>Submit Claim</button></form>', legend: [{ id: 'R1', type: 'policy', bbox: [10, 10, 200, 25] }] },
  { name: 'Add family member to insurance', dom: '<div><input name="member_name" value="REDACTED" /><input name="relation" value="Spouse" /><button>Add</button></div>', legend: [{ id: 'R1', type: 'member_name', bbox: [10, 10, 150, 25] }] },
  { name: 'Mental health counseling booking', dom: '<form><select><option>Anxiety</option><option>Depression</option></select><button>Book Session</button></form>', legend: [] },
  { name: 'Eye care appointment', dom: '<div><input name="clinic" value="REDACTED" /><button>Book Eye Test</button></div>', legend: [{ id: 'R1', type: 'clinic', bbox: [10, 10, 200, 25] }] },
  { name: 'Dental checkup booking', dom: '<form><input name="phone" value="******.****" /><button>Confirm Slot</button></form>', legend: [{ id: 'R1', type: 'phone', bbox: [10, 10, 150, 25] }] },
  { name: 'Blood donation camp registration', dom: '<div><input name="name" value="REDACTED" /><input name="blood_group" value="O+" /><button>Register</button></div>', legend: [{ id: 'R1', type: 'name', bbox: [10, 10, 150, 25] }] },
  { name: 'Ambulance booking', dom: '<form><input name="location" value="REDACTED" /><input name="emergency" value="Accident" /><button>Book Ambulance</button></form>', legend: [{ id: 'R1', type: 'location', bbox: [10, 10, 200, 25] }] },
  { name: 'Medical records upload', dom: '<div><input type="file" name="report" /><button>Upload Report</button></div>', legend: [] },
  { name: 'Pharmacy store locator', dom: '<form><input name="pincode" value="******" /><button>Find Stores</button></form>', legend: [{ id: 'R1', type: 'pincode', bbox: [10, 10, 100, 25] }] },
  { name: 'Diet consultation booking', dom: '<div><input name="goal" value="Weight Loss" /><button>Book Diet Plan</button></div>', legend: [] },  // --- Education (81-95) ---
  { name: 'CBSE result check', dom: '<form><input name="roll" value="********" /><input name="dob" value="**/**/****" /><button>Get Result</button></form>', legend: [{ id: 'R1', type: 'roll', bbox: [10, 10, 150, 25] }] },
  { name: 'JEE Main registration', dom: '<div><input name="application" value="**********" /><input name="aadhaar" value="**** **** ****" /><button>Register</button></div>', legend: [{ id: 'R1', type: 'aadhaar', bbox: [10, 45, 200, 25] }] },
  { name: 'NEET admit card download', dom: '<form><input name="reg_id" value="**********" /><button>Download Admit Card</button></form>', legend: [{ id: 'R1', type: 'reg_id', bbox: [10, 10, 150, 25] }] },
  { name: 'Apply for scholarship', dom: '<div><input name="income" value="?*****" /><input name="caste" value="REDACTED" /><button>Apply</button></div>', legend: [{ id: 'R1', type: 'income', bbox: [10, 10, 150, 25] }] },
  { name: 'University fee payment', dom: '<form><input name="roll" value="********" /><input name="fee" value="?*****" /><button>Pay Fee</button></form>', legend: [{ id: 'R1', type: 'roll', bbox: [10, 10, 150, 25] }] },
  { name: 'Course enrollment on NPTEL', dom: '<div><input name="course" value="Data Structures" /><button>Enroll Free</button></div>', legend: [] },
  { name: 'Download degree certificate', dom: '<form><input name="university_roll" value="**********" /><button>Download</button></form>', legend: [{ id: 'R1', type: 'university_roll', bbox: [10, 10, 150, 25] }] },
  { name: 'Student loan application', dom: '<div><input name="aadhaar" value="**** **** ****" /><input name="loan_amount" value="?*****" /><button>Apply</button></div>', legend: [{ id: 'R1', type: 'aadhaar', bbox: [10, 10, 200, 25] }] },
  { name: 'Hostel booking', dom: '<form><input name="college" value="REDACTED" /><input name="room" value="Single" /><button>Book Hostel</button></form>', legend: [{ id: 'R1', type: 'college', bbox: [10, 10, 200, 25] }] },
  { name: 'Library book renewal', dom: '<div><input name="book_id" value="LIB-****" /><button>Renew</button></div>', legend: [{ id: 'R1', type: 'book_id', bbox: [10, 10, 100, 25] }] },
  { name: 'Attendance marking portal', dom: '<div><input name="student_id" value="********" /><button>Mark Present</button></div>', legend: [{ id: 'R1', type: 'student_id', bbox: [10, 10, 150, 25] }] },
  { name: 'Exam form submission', dom: '<form><input name="subject" value="Maths" /><input name="center" value="REDACTED" /><button>Submit Form</button></form>', legend: [{ id: 'R1', type: 'center', bbox: [10, 45, 200, 25] }] },
  { name: 'Transfer certificate request', dom: '<div><input name="roll" value="********" /><button>Request TC</button></div>', legend: [{ id: 'R1', type: 'roll', bbox: [10, 10, 150, 25] }] },
  { name: 'Alumni registration', dom: '<form><input name="graduation_year" value="****" /><input name="email" value="***@***.com" /><button>Register</button></form>', legend: [{ id: 'R1', type: 'email', bbox: [10, 45, 200, 25] }] },
  { name: 'Internship application', dom: '<div><input name="company" value="REDACTED" /><button>Apply Internship</button></div>', legend: [{ id: 'R1', type: 'company', bbox: [10, 10, 200, 25] }] },  // --- Utilities & Bills (96-110) ---
  { name: 'Electricity bill payment', dom: '<form><input name="consumer" value="**********" /><input name="amount" value="?****" /><button>Pay Bill</button></form>', legend: [{ id: 'R1', type: 'consumer', bbox: [10, 10, 150, 25] }] },
  { name: 'Water bill payment', dom: '<div><input name="connection" value="WB-********" /><input name="amount" value="?****" /><button>Pay</button></div>', legend: [{ id: 'R1', type: 'connection', bbox: [10, 10, 200, 25] }] },
  { name: 'Gas cylinder booking', dom: '<form><input name="bp" value="BP**********" /><button>Book Refill ?***</button></form>', legend: [{ id: 'R1', type: 'bp', bbox: [10, 10, 150, 25] }] },
  { name: 'Broadband bill payment', dom: '<div><input name="account" value="BB-**********" /><input name="amount" value="?****" /><button>Pay</button></div>', legend: [{ id: 'R1', type: 'account', bbox: [10, 10, 200, 25] }] },
  { name: 'Postpaid mobile bill payment', dom: '<form><input name="mobile" value="******.****" /><input name="amount" value="?***" /><button>Pay Bill</button></form>', legend: [{ id: 'R1', type: 'mobile', bbox: [10, 10, 150, 25] }] },
  { name: 'DTH recharge', dom: '<div><input name="subscriber" value="**********" /><input name="pack" value="?***" /><button>Recharge</button></div>', legend: [{ id: 'R1', type: 'subscriber', bbox: [10, 10, 150, 25] }] },
  { name: 'Municipal property tax', dom: '<form><input name="property" value="PT-********" /><input name="amount" value="?*****" /><button>Pay</button></form>', legend: [{ id: 'R1', type: 'property', bbox: [10, 10, 200, 25] }] },
  { name: 'Parking fine payment', dom: '<div><input name="challan" value="CH-********" /><input name="amount" value="?****" /><button>Pay Challan</button></div>', legend: [{ id: 'R1', type: 'challan', bbox: [10, 10, 200, 25] }] },
  { name: 'Toll tax payment', dom: '<form><input name="vehicle" value="KA-**-****" /><button>Pay Toll ?**</button></form>', legend: [{ id: 'R1', type: 'vehicle', bbox: [10, 10, 150, 25] }] },
  { name: 'Insurance premium payment', dom: '<div><input name="policy" value="IN-**********" /><input name="premium" value="?*****" /><button>Pay Premium</button></div>', legend: [{ id: 'R1', type: 'policy', bbox: [10, 10, 200, 25] }] },
  { name: 'Credit card statement payment', dom: '<form><input name="card" value="**** **** **** ****" /><input name="amount" value="?*****" /><button>Pay Now</button></form>', legend: [{ id: 'R1', type: 'card', bbox: [10, 10, 200, 25] }] },
  { name: 'Loan statement download', dom: '<div><input name="loan" value="LN-**********" /><button>Download Statement</button></div>', legend: [{ id: 'R1', type: 'loan', bbox: [10, 10, 200, 25] }] },
  { name: 'PPF account statement', dom: '<form><input name="ppf" value="PPF-********" /><button>View Statement</button></form>', legend: [{ id: 'R1', type: 'ppf', bbox: [10, 10, 150, 25] }] },
  { name: 'NPS contribution', dom: '<div><input name="pran" value="**********" /><input name="amount" value="?****" /><button>Contribute</button></div>', legend: [{ id: 'R1', type: 'pran', bbox: [10, 10, 150, 25] }] },
  { name: 'Mutual fund statement request', dom: '<form><input name="folio" value="MF-********" /><button>Get Statement</button></form>', legend: [{ id: 'R1', type: 'folio', bbox: [10, 10, 150, 25] }] },  // --- Social & Communication (111-125) ---
  { name: 'Aadhaar linking to mobile', dom: '<div><input name="aadhaar" value="**** **** ****" /><input name="mobile" value="******.****" /><button>Link</button></div>', legend: [{ id: 'R1', type: 'aadhaar', bbox: [10, 10, 200, 25] }, { id: 'R2', type: 'mobile', bbox: [10, 45, 150, 25] }] },
  { name: 'Email account password reset', dom: '<form><input name="email" value="***@***.com" /><button>Send Reset Link</button></form>', legend: [{ id: 'R1', type: 'email', bbox: [10, 10, 200, 25] }] },
  { name: 'Two-factor authentication setup', dom: '<div><input name="phone" value="******.****" /><button>Send OTP</button></div>', legend: [{ id: 'R1', type: 'phone', bbox: [10, 10, 150, 25] }] },
  { name: 'Profile picture update', dom: '<div><input type="file" name="avatar" /><button>Upload Photo</button></div>', legend: [] },
  { name: 'Change account password', dom: '<form><input type="password" name="old" value="********" /><input type="password" name="new" value="********" /><button>Change</button></form>', legend: [{ id: 'R1', type: 'password', bbox: [10, 10, 200, 25] }, { id: 'R2', type: 'password', bbox: [10, 45, 200, 25] }] },
  { name: 'Update delivery address', dom: '<div><textarea name="address" value="REDACTED"></textarea><button>Save Address</button></div>', legend: [{ id: 'R1', type: 'address', bbox: [10, 10, 300, 80] }] },
  { name: 'Newsletter subscription', dom: '<form><input name="email" value="***@***.com" /><button>Subscribe</button></form>', legend: [{ id: 'R1', type: 'email', bbox: [10, 10, 200, 25] }] },
  { name: 'Feedback form submission', dom: '<div><textarea name="feedback" placeholder="Your feedback"></textarea><button>Submit</button></div>', legend: [] },
  { name: 'Referral code sharing', dom: '<div><input name="referral" value="REF-****" /><button>Copy Code</button></div>', legend: [{ id: 'R1', type: 'referral', bbox: [10, 10, 150, 25] }] },
  { name: 'Gift card redemption', dom: '<form><input name="code" value="****-****-****" /><button>Redeem</button></form>', legend: [{ id: 'R1', type: 'code', bbox: [10, 10, 200, 25] }] },
  { name: 'Loyalty points check', dom: '<div><p>Points: ****</p><button>Redeem Now</button></div>', legend: [{ id: 'R1', type: 'points', bbox: [10, 10, 100, 20] }] },
  { name: 'Referral bonus withdrawal', dom: '<form><input name="upi" value="***@***" /><button>Withdraw ?***</button></form>', legend: [{ id: 'R1', type: 'upi', bbox: [10, 10, 150, 25] }] },
  { name: 'Account deletion request', dom: '<div><p>Are you sure?</p><button>Delete My Account</button></div>', legend: [] },
  { name: 'Privacy settings update', dom: '<form><input type="checkbox" name="analytics" checked /><button>Save Settings</button></form>', legend: [] },
  { name: 'Download personal data', dom: '<div><button>Download My Data (GDPR)</button></div>', legend: [] },  // --- Government Services (126-140) ---
  { name: 'File RTI application', dom: '<form><input name="applicant" value="REDACTED" /><textarea name="query"></textarea><button>Submit RTI ?**</button></form>', legend: [{ id: 'R1', type: 'applicant', bbox: [10, 10, 150, 25] }] },
  { name: 'Income certificate application', dom: '<div><input name="name" value="REDACTED" /><input name="purpose" value="Scholarship" /><button>Apply</button></div>', legend: [{ id: 'R1', type: 'name', bbox: [10, 10, 150, 25] }] },
  { name: 'Caste certificate download', dom: '<form><input name="application" value="CC-********" /><button>Download</button></form>', legend: [{ id: 'R1', type: 'application', bbox: [10, 10, 200, 25] }] },
  { name: 'Domicile certificate request', dom: '<div><input name="district" value="REDACTED" /><button>Request Domicile</button></div>', legend: [{ id: 'R1', type: 'district', bbox: [10, 10, 200, 25] }] },
  { name: 'Birth certificate application', dom: '<form><input name="child_name" value="REDACTED" /><input name="dob" value="**/**/****" /><button>Apply</button></form>', legend: [{ id: 'R1', type: 'child_name', bbox: [10, 10, 150, 25] }] },
  { name: 'Death certificate download', dom: '<div><input name="deceased" value="REDACTED" /><button>Download</button></div>', legend: [{ id: 'R1', type: 'deceased', bbox: [10, 10, 150, 25] }] },
  { name: 'Marriage certificate registration', dom: '<form><input name="groom" value="REDACTED" /><input name="bride" value="REDACTED" /><button>Register</button></form>', legend: [{ id: 'R1', type: 'groom', bbox: [10, 10, 150, 25] }, { id: 'R2', type: 'bride', bbox: [10, 45, 150, 25] }] },
  { name: 'Ration card application', dom: '<div><input name="head" value="REDACTED" /><input name="members" value="*" /><button>Apply</button></div>', legend: [{ id: 'R1', type: 'head', bbox: [10, 10, 150, 25] }] },
  { name: 'Senior citizen card', dom: '<form><input name="age" value="**" /><input name="aadhaar" value="**** **** ****" /><button>Apply</button></form>', legend: [{ id: 'R1', type: 'aadhaar', bbox: [10, 45, 200, 25] }] },
  { name: 'Disability certificate', dom: '<div><input name="disability" value="**" /><button>Apply Certificate</button></div>', legend: [{ id: 'R1', type: 'disability', bbox: [10, 10, 100, 25] }] },
  { name: 'Land records search (Bhoomi)', dom: '<form><input name="survey" value="**" /><input name="village" value="REDACTED" /><button>Search</button></form>', legend: [{ id: 'R1', type: 'village', bbox: [10, 45, 200, 25] }] },
  { name: 'Court case status check', dom: '<div><input name="case" value="**********" /><button>Check Status</button></div>', legend: [{ id: 'R1', type: 'case', bbox: [10, 10, 150, 25] }] },
  { name: 'Complaint filing on CPGRAMS', dom: '<form><textarea name="grievance"></textarea><button>Submit to PMO</button></form>', legend: [] },
  { name: 'Public notice submission', dom: '<div><input name="notice" value="REDACTED" /><button>Publish Notice</button></div>', legend: [{ id: 'R1', type: 'notice', bbox: [10, 10, 200, 25] }] },
  { name: 'Tender bid submission', dom: '<form><input name="bid_amount" value="?*****" /><button>Submit Bid</button></form>', legend: [{ id: 'R1', type: 'bid_amount', bbox: [10, 10, 150, 25] }] },
  // --- Miscellaneous (141-150) ---
  { name: 'Donate to PM Relief Fund', dom: '<div><input name="amount" value="?****" /><button>Donate Now</button></div>', legend: [{ id: 'R1', type: 'amount', bbox: [10, 10, 150, 25] }] },
  { name: 'Register for COVID vaccination', dom: '<form><input name="mobile" value="******.****" /><input name="aadhaar" value="**** **** ****" /><button>Schedule Slot</button></form>', legend: [{ id: 'R1', type: 'mobile', bbox: [10, 10, 150, 25] }] },
  { name: 'Download vaccine certificate', dom: '<div><input name="beneficiary" value="**********" /><button>Download</button></div>', legend: [{ id: 'R1', type: 'beneficiary', bbox: [10, 10, 150, 25] }] },
  { name: 'Apply for startup recognition', dom: '<form><input name="cin" value="REDACTED" /><button>Apply for DPIIT</button></form>', legend: [{ id: 'R1', type: 'cin', bbox: [10, 10, 200, 25] }] },
  { name: 'Trademark application', dom: '<div><input name="brand" value="REDACTED" /><input name="class" value="**" /><button>File TM</button></div>', legend: [{ id: 'R1', type: 'brand', bbox: [10, 10, 200, 25] }] },
  { name: 'Copyright registration', dom: '<form><input name="work" value="REDACTED" /><button>Register Copyright</button></form>', legend: [{ id: 'R1', type: 'work', bbox: [10, 10, 200, 25] }] },
  { name: 'Patent filing', dom: '<div><input name="invention" value="REDACTED" /><button>File Patent</button></div>', legend: [{ id: 'R1', type: 'invention', bbox: [10, 10, 200, 25] }] },
  { name: 'ISO certification inquiry', dom: '<form><input name="company" value="REDACTED" /><button>Get Quote</button></form>', legend: [{ id: 'R1', type: 'company', bbox: [10, 10, 200, 25] }] },
  { name: 'FSSAI license application', dom: '<div><input name="business" value="REDACTED" /><input name="turnover" value="?*****" /><button>Apply</button></div>', legend: [{ id: 'R1', type: 'business', bbox: [10, 10, 200, 25] }] },
  { name: 'Import Export Code application', dom: '<form><input name="pan" value="**** *****" /><input name="bank" value="************" /><button>Apply IEC</button></form>', legend: [{ id: 'R1', type: 'pan', bbox: [10, 10, 150, 25] }, { id: 'R2', type: 'bank', bbox: [10, 45, 200, 25] }] },
  { name: 'UPI Autopay Setup for SIP', dom: '<form><input name="upi" value="***@***" /><input name="amount" value="?****" /><button>Enable Autopay</button></form>', legend: [{ id: 'R1', type: 'upi', bbox: [10, 10, 150, 25] }] },
];

function generateMocks(): MockScenario[] {
  return SCENARIO_TEMPLATES.map((t) => ({
    scenario_name: t.name,
    mock_masked_dom: t.dom,
    mock_redaction_legend: t.legend,
    mock_image_base64: DUMMY_BASE64_IMAGE,
  }));
}

function main(): void {
  const mocks = generateMocks();
  const outDir = join(__dirname, 'fixtures');
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  const outPath = join(outDir, 'mock_scenarios_150.json');
  writeFileSync(outPath, JSON.stringify(mocks, null, 2), 'utf8');
  console.log(`Generated ${mocks.length} mock scenarios -> ${outPath}`);
}

main();