import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import firstCarosel from "../../../../../assets/Fast & Secure Online Payments for Students  relevent this create image.jpg";
import firstCarosel1 from "../../../../../assets/students payment related make image (1).jpg";
import firstCarosel2 from "../../../../../assets/Track Payment History & Download Receipts about this create image.jpg";
const Hero = () => {
  return (
    <div className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={2000}
        transitionTime={600}
        swipeable
        emulateTouch
      >
        <div>
          <img
            src={firstCarosel}
            alt="Online Payment Portal"
            className="h-[80vh] w-full object-cover"
          />
          <p className="legend text-base md:text-lg">
            Fast & Secure Online Payments for Students
          </p>
        </div>
        <div>
          <img
            src={firstCarosel1}
            alt="Tuition Fee Submission"
            className="h-[80vh] w-full object-cover"
          />
          <p className="legend text-base md:text-lg">
            Submit Tuition & Exam Fees from Anywhere
          </p>
        </div>
        <div>
          <img
            src={firstCarosel2}
            alt="Digital Receipts"
            className="h-[80vh] w-full object-cover"
          />
          <p className="legend text-base md:text-lg">
            Track Payment History & Download Receipts
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
