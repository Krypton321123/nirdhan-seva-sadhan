let idCardTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ID Card</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    .id-card {
      width: 380px;
      border: 2px solid #333333;
      border-radius: 10px;
      background-color: #ffffff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;
      padding: 10px 15px;
    }

    .id-card::before {
      content: "निर्धन सेवा संस्थान";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-0deg);
      font-size: 35px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.1); 
      z-index: 0;
      white-space: nowrap;
      pointer-events: none;
    }

    .id-card::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 300px;
      background: url('https://via.placeholder.com/300x300?text=Watermark') no-repeat center center;
      background-size: contain;
      opacity: 0.1;
      z-index: 0;
      pointer-events: none;
    }

    .header {
      display: block;
      background-color: #4caf50;
      color: #ffffff;
      padding: 5px 10px;
      border-radius: 8px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .header .sub-text {
      font-size: 12px;
      margin-top: 5px;
      color: #ffffff;
      font-weight: normal;
    }

    .highlight {
      margin: 15px 0;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #d32f2f;
      position: relative;
      z-index: 1;
    }

    .details {
      margin-top: 10px;
      text-align: left;
      font-size: 14px;
      color: #333333;
      position: relative;
      z-index: 1;
    }

    .details p {
      margin: 5px 0;
    }

    .details p span {
      font-weight: bold;
    }

    .footer {
      margin-top: 15px;
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .footer .certified {
      margin-top: 10px;
      color: #4caf50;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="id-card">
    <div class="header">
      <div>Nirdhan Sewa Sansthan</div>
      <div class="sub-text">ITA एवं नीति आयोग द्वारा अनुमोदित</div>
    </div>

    <div class="highlight">IDENTITY CARD</div>

    <div class="details">
      <p><span>Name:</span> John Doe</p>
      <p><span>S/O:</span> Rajesh Kumar</p>
      <p><span>D.O.B:</span> 12-Jan-1990</p>
      <p><span>Rank:</span> Member</p>
      <p><span>ID No:</span> 12345</p>
      <p><span>Valid Upto:</span> 31-Dec-2025</p>
      <p><span>Address:</span> 123, Example Street, City, State, Country</p>
    </div>

    <div class="footer">
      <p>12A and 80G Certified</p>
      <div class="certified">Empowering lives through trust and certification</div>
    </div>
  </div>
</body>
</html>
`;

export default idCardTemplate;