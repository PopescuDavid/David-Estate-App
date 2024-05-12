import "./contactPage.scss";

function ContactPage() {
  return (
    <div className="contactPage">
      <div className="hero">
        <div className="overlay"></div>
        
      </div>
      <div className="contactDetails">
        <div className="container">
          <h1 style={{ textAlign: "center", marginBottom:"20px"}}>Contact Us</h1>
          <p style={{ textAlign: "center", marginBottom:"20px"}}>If you have any questions or inquiries, feel free to reach out to us. Our team is always here to assist you.</p>
          <h2>Our Contact Information</h2>
          <div className="contactInfo">
            <div className="info" style={{  marginRight:"15px" }}>
              <img src="/location.png" alt="Location Icon" />
              <div>
                <h3>Address</h3>
                <p>123 University Street, Oradea, Romania</p>
              </div>
            </div>
            <div className="info" style={{marginRight:"20px" }}>
              <img src="/phone.png" alt="Phone Icon" />
              <div>
                <h3>Phone</h3>
                <p>(123) 456-7890</p>
              </div>
            </div>
            <div className="info">
              <img src="/email.png" alt="Email Icon" />
              <div>
                <h3>Email</h3>
                <p>info@davidestate.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contactForm">
        <div className="container">
          <h2>Send Us a Message</h2>
          <form>
            <div className="formGroup">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="formGroup">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
