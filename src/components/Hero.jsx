
function Hero() {
    return(
        <div class="container mt-5 my-2">
      <div class="row">
        <div class="col-md-6 order-md-2">
          <div class="ellipse1"></div>
          <div class="ellipse2"></div>
          <img
            src="assets\image\women.png"
            class="img-fluid"
            alt="Responsive image"
          />
        </div>
        <div class="col-md-6 heder-cont">
          <div class="new d-flex align-items-center">
            <div class="text1">
              <p class="d-flex align-items-center justify-content-center">
                new
              </p>
            </div>
            <div class="text2">
              <p class="d-flex align-items-center">
                Stay connected to the upcoming & Recent jobs
              </p>
            </div>
          </div>
          <h1>
            Your Solution <br />
            Legal Consultacy
          </h1>
          <p>
            We are here to help you take care of your legality with the best
            service especially for you.
          </p>
          <button class="btn btn-primary mb-3 botton">Get Started</button>
          <div class="company">
            <p>Trusted by 10+ companies in indonesia</p>
            <div class="icon-grid">
              <img src="assets/image/Airbnb Logo.png" alt="photo" />
              <img src="assets/image/Hubspot Logo.png" alt="photo" />
              <img src="assets/image/Microsoft Logo.png" alt="photo" />
              <img src="assets/image/Google Logo.png" alt="photo" />
            </div>
          </div>
        </div>
        <div class="name">
          <p>Tiara Andini</p>
          <p>-Lawyer</p>
        </div>
      </div>
    </div>
    )
}
export default Hero;