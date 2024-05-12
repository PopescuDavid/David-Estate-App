import "./aboutPage.scss";

function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="hero">
        <div className="overlay"></div>
      </div>
      <div className="mission">
        <div className="container">
          <h2>Our Mission</h2>
          <p style={{ textAlign: "center" , lineHeight:"25px"}}>
                David Estate is dedicated to revolutionizing the real estate experience, empowering clients with innovative solutions tailored to their unique aspirations. With a relentless focus on excellence, we leverage cutting-edge technology and industry expertise to unlock opportunities and exceed expectations. Whether embarking on your maiden property venture or expanding an extensive portfolio, we are your trusted partner in realizing your real estate ambitions.
          </p>
        </div>
      </div>
      <div className="team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="teamMembers">
            <div className="member">
              <img src="/CEO.jpeg" alt="Team Member 1" />
              <h3>David Popescu</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="member">
              <img src="/headOfSales.jpg" alt="Team Member 2" />
              <h3>Jane Smith</h3>
              <p>Head of Sales</p>
            </div>
            <div className="member">
              <img src="/chiefArhitect.jpg" alt="Team Member 3" />
              <h3>Michael Johnson</h3>
              <p>Chief Architect</p>
            </div>
          </div>
        </div>
      </div>
      <div className="testimonials">
        <div className="container">
          <h2>Client Testimonials</h2>
          <div className="testimonial">
            <img src="/client1.jpg" alt="Client 1" />
            <blockquote>
              I had an amazing experience working with David Estate. They helped me find the perfect home for my family. Highly recommended!
            </blockquote>
            <cite>- Sarah Williams</cite>
          </div>
          <div className="testimonial">
            <img src="/client2.jpg" alt="Client 2" />
            <blockquote>
              From start to finish, the team at David Estate provided exceptional service. I couldn not be happier with my new apartment.
            </blockquote>
            <cite>- Mark Johnson</cite>
          </div>
        </div>
      </div>
      <div className="contact">
        <div className="container" style={{ textAlign: "center"}}>
          <h2>Contact Us</h2>
          <p>If you have any questions or inquiries, feel free to reach out to us. Our team is always here to assist you.</p>
          <div className="contactInfo">
            <div className="info" style={{ marginTop: "25px", marginRight:"15px" }}>
              <img src="/location.png" alt="Location Icon" />
              <p>123 University Street, Oradea, Romania</p>
            </div>
            <div className="info" style={{ marginTop: "25px", marginRight:"10px" }}>
              <img src="/phone.png" alt="Phone Icon" />
              <p>(123) 456-7890</p>
            </div>
            <div className="info" style={{ marginTop: "25px" }}>
              <img src="/email.png" alt="Email Icon" />
              <p>info@davidestate.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
