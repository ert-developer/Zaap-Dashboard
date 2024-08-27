import "./payment-nav-bar-styles.css";
import { Link, useLocation } from "react-router-dom";

const PaymentNavbar = () => {
  const location = useLocation();

  const routes = [
    { path: "/customer-payment", label: "Customer(Hired)" },
    {
      path: "/service-provider-payment-in-progress",
      label: "Service Provider(In Progress)",
    },
    {
      path: "/service-provider-payment-done",
      label: "Service Provider(Work Done)",
    },
  ];
  return (
    <nav className="navigation-container">
      {routes.map((route, index) => (
        <Link
          key={index}
          to={route.path}
          className={`nav-link ${
            location.pathname === route.path ? "active" : ""
          }`}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default PaymentNavbar;
