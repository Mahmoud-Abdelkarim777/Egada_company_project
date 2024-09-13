import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

class CountUp {
  constructor(el) {
    this.el = el;
    this.setVars();
    this.init();
  }

  setVars() {
    this.number = this.el.querySelectorAll("[data-countup-number]");
    this.observerOptions = { root: null, rootMargin: "0px 0px", threshold: 0 };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const end = parseFloat(entry.target.dataset.countupNumber.replace(/,/g, ""));
        const decimals = this.countDecimals(end);
        if (entry.isIntersecting) {
          this.iterateValue(entry.target, end, decimals);
        }
      });
    }, this.observerOptions);
  }

  init() {
    if (this.number.length > 0) {
      this.number.forEach((el) => {
        this.observer.observe(el);
      });
    }
  }

  iterateValue(el, end, decimals) {
    const start = 0;
    const duration = 2500;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsedPercent = (timestamp - startTimestamp) / duration;
      const easedProgress = Math.min(this.easeOutQuint(elapsedPercent), 1);
      let interimNumber = Math.abs(easedProgress * (end - start) + start);
      el.innerHTML = this.formatNumber(interimNumber, decimals);
      if (easedProgress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  easeOutQuad(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  easeOutQuint(x) {
    return 1 - Math.pow(1 - x, 5);
  }

  countDecimals(val) {
    if (Math.floor(val) === val) return 0;
    return val.toString().split(".")[1].length || 0;
  }

  formatNumber(val, decimals) {
    return val.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }
}

function Achievment() {
  useEffect(() => {
    const dataModules = [...document.querySelectorAll('[data-module="countup"]')];
    dataModules.forEach((element) => {
      new CountUp(element);
    });
  }, []);

  return (
    <div className="achievment d-flex justify-content-center text-center">
      <div className="content">
        <div className="heading d-flex flex-column my-5">
          <h1 className="p-1">Some count that matters</h1>
          <p className="mb-0">Our achievement in the journey depicted in numbers</p>
        </div>
        <div className="count d-flex justify-content-center mb-5" data-module="countup">
          <div className="client mx-2">
            <h1>
              <span data-countup-number="30">0</span>
            </h1>
            <p>Client</p>
          </div>
          <div className="divider1"></div>
          <div className="taken mx-2">
            <h1>
              <span data-countup-number="300">0</span>
              <span>+</span>
            </h1>
            <p>Taken business legalities</p>
          </div>
          <div className="divider2"></div>
          <div className="year mx-2">
            <h1>
              <span data-countup-number="8">0</span>
            </h1>
            <p>Years of Journey</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Achievment;
