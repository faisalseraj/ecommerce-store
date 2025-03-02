import { IConfirmedOrder } from "../_models/Order";

export const billingTemplate = (orderDetails: IConfirmedOrder) => {
    console.dir(orderDetails.items, "orderDetails")
  return `
    <!DOCTYPE html>
<html>
<head>
    <title>Order Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        
        .container {
            width: 600px;
            margin: 40px auto;
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            border-bottom: 1px solid #ddd;
        }
        
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        
        .order-summary {
            margin-top: 20px;
        }
        
        .order-summary table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .order-summary th {
            background-color: #f0f0f0;
            padding: 10px;
            border: 1px solid #ddd;
        }
        
        .order-summary td {
            padding: 10px;
            border: 1px solid #ddd;
        }
        
        .order-summary .total {
            font-weight: bold;
        }
        
        .address {
            margin-top: 20px;
        }
        
        .address h2 {
            margin: 0;
            font-size: 18px;
        }
        
        .address p {
            margin-bottom: 10px;
        }
        
        .footer {
            margin-top: 20px;
            background-color: #333;
            color: #fff;
            padding: 10px;
            border-top: 1px solid #ddd;
        }
        
        .footer p {
            margin: 0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Receipt</h1>
        </div>
        <div class="order-summary">
            <h2>Order Summary</h2>
            <table>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                ${orderDetails.items.map((item) => `
                    <tr>
                        <td>${item.productId.name}</td>
                        <td>${item.quantity}</td>
                        <td>$${item.productId.price}</td>
                        <td>$${item.productId.price * item.quantity}</td>
                    </tr>
                `).join('')}
                <tr>
                    <td colspan="3">Subtotal:</td>
                    <td>$${orderDetails.totalAmount}</td>
                </tr>
                <tr>
                    <td colspan="3">Tax (8%):</td>
                    <td>$${0}</td>
                </tr>
                <tr>
                    <td colspan="3">Total:</td>
                    <td class="total">$${orderDetails.totalAmount}</td>
                </tr>
            </table>
        </div>
        <div class="address">
            <h2>Shipping Address</h2>
            <p>${orderDetails.shippingDetails.fullName}</p>
            <p>${orderDetails.shippingDetails.address}</p>
            <p>${orderDetails.shippingDetails.phoneNumber}</p>
            <p>${orderDetails.shippingDetails.email}</p>
        </div>
        <div class="footer">
            <p>Thank you for your order! We will dispatch your order to the above address shortly.</p>
            <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
        </div>
    </div>
</body>
</html>
    `;
};