import React from "react";
import "../Components/Footer.css";
function Footer() {
  return (
    <>
      <div className="Footer">
        <div className="container">
          <div className="row">
            <div>
              <h5 style={{ color: "white" }}>BIRKENTECH Accounting System</h5>

              <p style={{ color: "white" }}>
                Developed By Vipul Tomar & Winnie Tran
              </p>

              <div>
                <a href="https://www.birkentech.com/">Birkentech.com</a>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
