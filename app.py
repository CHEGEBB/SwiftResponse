from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
import os
from dotenv import load_dotenv


account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
twilio_phone_number = os.getenv('TWILIO_PHONE_NUMBER')

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'your_secret_key')

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'email' not in session:
            flash('You need to be logged in to access this page!', 'error')
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated_function



# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///swiftresponse.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Define Contact model
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.String(100), nullable=False)

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    incident = db.Column(db.String(100), nullable=False)
    details = db.Column(db.String(255), nullable=False) 

class AccidentData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    address = db.Column(db.String(200))
    insurance = db.Column(db.String(100))
    details = db.Column(db.Text)

class EmergencyResponse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    blood_type = db.Column(db.String(5))
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    allergies = db.Column(db.Text)
    medical_history = db.Column(db.Text)
    medications = db.Column(db.Text)
    emergency_type = db.Column(db.String(50), nullable=False)
    symptoms = db.Column(db.Text, nullable=False)
    additional_info = db.Column(db.Text)

class FireEmergency(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    fire_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    urgency = db.Column(db.String(20), nullable=False)
    evacuations = db.Column(db.String(100))
    injuries = db.Column(db.String(100))

class SecurityReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    incident_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    urgency = db.Column(db.String(10), nullable=False)
    witnesses = db.Column(db.Text)
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

class GeneralAlert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    alert_type = db.Column(db.String(50), nullable=False)
    alert_message = db.Column(db.Text, nullable=False)
    emergency_type = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    sms = db.Column(db.Boolean, default=False)
    email = db.Column(db.Boolean, default=False)
    push_notifications = db.Column(db.Boolean, default=False)
    phone_number = db.Column(db.String(20))

# Create tables if they don't exist
with app.app_context():
    db.create_all()

@app.route('/SwiftResponse')
def index():
    if 'email' not in session:
        return redirect(url_for('login'))
    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        conPassword = request.form['confirmPassword']

        if password != conPassword:
            flash('Passwords do not match!', 'error')
            return redirect('/signup')
        
        # Check if the email already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Email already exists!', 'error')
            return redirect('/signup')
        
        # Create a new user
        new_user = User(username=username,email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        
        flash('Signup successful!', 'success')
        return redirect('/SwiftResponse')
    return render_template('signup.html')

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        if '@' not in email:
            username = email
            user_name = User.query.filter_by(username=username).first()
            user_password = User.query.filter_by(password=password).first()

            if user_name and user_password:
                session['email'] = email
                return redirect('/SwiftResponse')
            return redirect('/')
        user_email = User.query.filter_by(email=email).first()
        user_password = User.query.filter_by(password=password).first()
        flash('Invalid email or password!', 'error')
        
        

        if user_email and user_password:
            session['email'] = email
            flash('Login successful!', 'success')
            return redirect('/SwiftResponse')

        flash('Invalid email or password!', 'error')
        return redirect('/')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('email', None)
    flash('You have been logged out!', 'success')
    return redirect(url_for('login'))
@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/report', methods=['GET', 'POST'])
def report():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        location = request.form['location']
        incident = request.form['incident']
        details = request.form['details']
        flash('Thanks for submitting your report!', 'success')

        report = Report(name=name, email=email, phone=phone, location=location, incident=incident, details=details)
        db.session.add(report)
        db.session.commit()
        return redirect(url_for('report'))
    return render_template('report.html')

        

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        flash('Thanks for submitting your contact information!', 'success')

        contact = Contact(name=name, email=email, message=message)
        db.session.add(contact)
        db.session.commit()
        return redirect(url_for('contact'))
    return render_template('contact.html')


# Define emergency routes
@app.route('/accident')
def accident():
    return render_template('/pages/emergency/accident.html')

@app.route('/fire')
def fire():
    return render_template('/pages/emergency/fire.html')

@app.route('/medical')
def medical():
    return render_template('/pages/emergency/medical.html')

@app.route('/security')
def security():
    return render_template('/pages/emergency/security.html')

# Define general alerts route
@app.route('/general', methods=['GET', 'POST'])
def general():
    return render_template('/pages/alerts/general.html')
@app.route('/submit_form', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        address = request.form['address']
        insurance = request.form['insurance']
        details = request.form['details']

        new_data = AccidentData(name=name, email=email, phone=phone, address=address, insurance=insurance, details=details)
        db.session.add(new_data)
        db.session.commit()
        return 'Form submitted successfully'
    
@app.route('/submit_medical_form', methods=['POST'])
def submit_medical_form():
    # Get form data
    name = request.form['name']
    age = request.form['age']
    gender = request.form['gender']
    blood_type = request.form['blood-type']
    email = request.form['email']
    phone = request.form['phone']
    address = request.form['address']
    allergies = request.form['allergies']
    medical_history = request.form['medical-history']
    medications = request.form['medications']
    emergency_type = request.form['emergency-type']
    symptoms = request.form['symptoms']
    additional_info = request.form['additional-info']

    # Create an instance of the EmergencyResponse model
    emergency_response = EmergencyResponse(name=name, age=age, gender=gender, blood_type=blood_type,
                                           email=email, phone=phone, address=address,
                                           allergies=allergies, medical_history=medical_history,
                                           medications=medications, emergency_type=emergency_type,
                                           symptoms=symptoms, additional_info=additional_info)
    
    # Add instance to the database session
    db.session.add(emergency_response)
    
    # Commit changes to the database
    db.session.commit()

    return 'Form submitted successfully'
@app.route('/submit_fire_form', methods=['POST'])
def submit_fire_form():
    if request.method == 'POST':
        # Extract form data
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        location = request.form['address']
        fire_type = request.form['fire-type']
        description = request.form['description']
        urgency = request.form['urgency']
        evacuations = request.form.get('evacuations', '')  # Optional field, use get method to handle if not provided
        injuries = request.form.get('injuries', '')  # Optional field, use get method to handle if not provided

        # Create a new instance of the FireEmergency model
        fire_emergency = FireEmergency(
            name=name,
            email=email,
            phone=phone,
            location=location,
            fire_type=fire_type,
            description=description,
            urgency=urgency,
            evacuations=evacuations,
            injuries=injuries
        )

        # Add the new instance to the database session
        db.session.add(fire_emergency)

        # Commit the changes to the database
        db.session.commit()

        # Redirect to a success page or perform any other action as needed
        flash('Fire emergency report submitted successfully!', 'success')
        return redirect(url_for('fire'))  # Redirect to the fire page after submission

    # Handle the case if the request method is not POST
    flash('Invalid request method!', 'error')
    return redirect(url_for('fire'))

@app.route('/submit_security_form', methods=['POST'])
def submit_security_form():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        location = request.form['location']
        incident_type = request.form['incident-type']
        description = request.form['description']
        urgency = request.form['urgency']
        witnesses = request.form['witnesses']

        # Create a new SecurityReport object with the form data
        new_report = SecurityReport(name=name, email=email, phone=phone, location=location,
                                    incident_type=incident_type, description=description,
                                    urgency=urgency, witnesses=witnesses)

        # Add the new report to the database session
        db.session.add(new_report)
        # Commit the changes to the database
        db.session.commit()

        flash('Security emergency report submitted successfully!', 'success')
        return redirect(url_for('index'))
    else:
        flash('Failed to submit security emergency report. Please try again.', 'error')
        return redirect(url_for('index'))
@app.route('/admin', methods=['GET', 'POST'])
def admin():
    # Fetch data for reports and contacts from the database
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        conPassword = request.form['confirmPassword']

        if password != conPassword:
            flash('Passwords do not match!', 'error')
            return redirect('/admin')
        
        # Check if the email already exists
        existing_user = Admin.query.filter_by(email=email).first()
        if existing_user:
            flash('Email already exists!', 'error')
            return redirect('/admin')
        
        # Create a new user
        new_user = Admin(email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        
        flash('Admin added successful!', 'success')
        return redirect('/admin')

    fire_reports = FireEmergency.query.all()
    security_reports = SecurityReport.query.all()
    accident_reports = AccidentData.query.all()
    medical_reports = EmergencyResponse.query.all()
    contacts = Contact.query.all()
    general_alert = GeneralAlert.query.all()
    user = User.query.all()
    return render_template('admin.html',users=user, contacts=contacts,alert=general_alert, fire_reports=fire_reports,security_reports=security_reports,accident_reports=accident_reports,medical_reports=medical_reports)
@app.route('/admin_login', methods=['GET', 'POST'])
def admin_login():
        if request.method == 'POST':
            email = request.form['email']
            password = request.form['password']
            if email == 'admin' and password == 'admin':
                session['admin'] = email
                flash('Login successful!', 'success')
                return redirect('/admin')
            if '@' not in email:
                email = email
                user_name = Admin.query.filter_by(email=email).first()
                user_password = Admin.query.filter_by(password=password).first()

                if user_name and user_password:
                    session['email'] = email
                    flash('Login successful!', 'success')
                    return redirect('/admin')
                return redirect('/admin_login')
            user_email = Admin.query.filter_by(email=email).first()
            user_password = Admin.query.filter_by(password=password).first()

            if user_email and user_password:
                session['email'] = email
                flash('Admin login successful!', 'success')
                return redirect('/admin')

            flash('Invalid email or password!', 'error')
            return redirect('/admin_login')
        return render_template('admin_login.html')
    # if request.method == 'POST':
    #     username = request.form['email']
    #     password = request.form['password']
    #     if username == 'admin' and password == 'admin':
    #         session['admin'] = username
    #         flash('Login successful!', 'success')
    #         return redirect('/admin')
    #     flash('Invalid username or password!', 'error')
    #     return redirect('/admin_login')
    # return render_template('admin_login.html')

@app.route('/submit_general_alert', methods=['POST'])
def submit_general_alert():
    if request.method == 'POST':
        alert_type = request.form['alert_type']
        alert_message = request.form['alert_message']
        emergency_type = request.form['emergency_type']
        location = request.form['location']
        sms = 'sms' in request.form  # Check if SMS checkbox is checked
        user_phone_number = request.form.get('phone_number')  # Retrieve the phone number from the form

        # Initialize Twilio Client
        client = Client(account_sid, auth_token)

        if sms and user_phone_number:  # Check if SMS is selected and a phone number is provided
            try:
                # Send SMS alert
                message = client.messages.create(
                    body=f'{alert_type}: {alert_message}',
                    from_=twilio_phone_number,
                    to=user_phone_number
                )
                flash('SMS alert sent successfully!', 'success')
            except Exception as e:
                flash(f'Failed to send SMS alert: {str(e)}', 'error')

        # Send email alert if selected
        if 'email' in request.form:
            # Code to send email alerts
            pass

        # Send push notification if selected
        if 'push_notifications' in request.form:
            # Code to send push notifications
            pass

        # Redirect to the general alerts page
        return redirect(url_for('general'))
    else:
        flash('Failed to submit alert. Please try again.', 'error')
        return redirect(url_for('general'))

@app.route('/admin/edit_item/<int:item_id>', methods=['GET', 'POST'])
@login_required
def edit_item(item_id):
    # Retrieve the item from the database
    item = item.query.get(item_id)

    if request.method == 'POST':
        # Update the item with data from the form
        item.name = request.form['name']
        item.price = request.form['price']
        item.description = request.form['description']

        # Commit the changes to the database
        db.session.commit()

        # Redirect to the admin page after editing
        flash('Item updated successfully!', 'success')
        return redirect(url_for('admin'))

    # Render the form for editing the item
    return render_template('edit_item.html', item=item)

if __name__ == '__main__':
    # Run the Flask application
    app.run(debug=True)
