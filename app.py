from flask import Flask, render_template, request, redirect, url_for, session, flash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a secure secret key

# Hardcoded email and password
HARDCODED_EMAIL = 'user@gmail.com'
HARDCODED_PASSWORD = 'password'

@app.route('/SwiftResponse')
def index():
    if 'email' not in session:
        return redirect(url_for('login'))
    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if email != HARDCODED_EMAIL:
            flash('Invalid email!', 'error')
            return redirect('/signup')
        if password != HARDCODED_PASSWORD:
            flash('Invalid password!', 'error')
            return redirect('/signup')
        session['email'] = email
        flash('Signup successful!', 'success')
        return redirect('/SwiftResponse')
    return render_template('signup.html')

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if email != HARDCODED_EMAIL or password != HARDCODED_PASSWORD:
            flash('Invalid email or password!', 'error')
            return redirect('/')
        session['email'] = email
        flash('Login successful!', 'success')
        return redirect('/SwiftResponse')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('email', None)
    flash('You have been logged out!', 'success')
    return redirect(url_for('login'))
@app.route('/about')
def about():
    return render_template('about.html')
@app.route('/contact')
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        flash('Thanks for submitting your contact information!', 'success')
    return render_template('contact.html')
# Define routes to handle form submissions
@app.route('/report', methods=['POST'])
def university_report():
    if request.method == 'POST':
        # Get data from the form
        location = request.form['university-location']
        details = request.form['university-details']
        student_name = request.form['student-name']
        student_id = request.form['student-id']
        emergency_type = request.form['university-emergency-type']
        
        # You can handle the data here (e.g., store it in a database)
        
        # Flash a message to indicate successful submission
        flash('University emergency report submitted successfully!', 'success')
        
        # Redirect back to the same page
        return redirect(url_for('index'))

@app.route('/submit_general_report', methods=['POST'])
def general_user_report():
    if request.method == 'POST':
        # Get data from the form
        location = request.form['general-user-location']
        details = request.form['general-user-details']
        emergency_type = request.form['general-user-emergency-type']
        
        # You can handle the data here (e.g., store it in a database)
        
        # Flash a message to indicate successful submission
        flash('General user emergency report submitted successfully!', 'success')
        
        # Redirect back to the same page
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
