import { useState, useEffect } from "react";
import { Button, Card, Grid, Col, Row, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import VoucherDetailsModal from "./VoucherDetailsModal"


const VoucherCards = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showModal, setShowModal] = useState(false)

  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")


  const categoryList = ["fashion", "restaurants", "cinema", "flower shop", "beauty"].sort()

  const locationList = ["berlin", "munich", "frankfurt", "hamburg", "duesseldorf", "stuttgart", "essen","leipzig", "dortmund","koeln"].sort()


const showVoucherDetailsHandler = (item)=>{
setSelectedVoucher(item);
setShowModal(true)
}

/* console.log("selectedVoucher", selectedVoucher); */
const cancelHandler = ()=>{
  setShowModal(false)
  }

  const handleSelectCategory = (e) => {
    setCategory(categoryList[e])
  }

  const handleSelectLocation = (e) => {
    setLocation(locationList[e])
  }
console.log(category);
  useEffect(() => {
if (category) {
  axios
  .post(`${process.env.REACT_APP_BE_URL}/api/vouchers/get-category-vouchers`, {category: category})
  .then((response) => {
    setVouchers(response.data);
  })
  .catch((err) => setErrorMessage(err.request.response));
} else if (location) {
  axios
  .post(`${process.env.REACT_APP_BE_URL}/api/vouchers/get-city-vouchers`, {location: location})
  .then((response) => {
    setVouchers(response.data);
  })
  .catch((err) => setErrorMessage(err.request.response));
}
else if (!category && !location) {
  axios
  .get(`${process.env.REACT_APP_BE_URL}/api/vouchers/get-vouchers`)
  .then((response) => {
    setVouchers(response.data);
  })
  .catch((err) => setErrorMessage(err.request.response));
}
  }, [location, category]);

  console.log("voucherCards", vouchers);
  return (
    <div className="vou-button">
      <div style={{margin:"20px", display:"flex", justifyContent:"space-between"}}>
      <Dropdown
       onSelect={handleSelectCategory}
      >
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Category
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {categoryList.map((item,index)=>(
          <Dropdown.Item eventKey={index}>{item}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown
       onSelect={handleSelectLocation}
      >
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select City
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {locationList.map((item,index)=>(
          <Dropdown.Item eventKey={index}>{item}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
      </div>

      <div className="g-4">
    
      {vouchers.map((item, index) => (
        <Col key={index}>
          <Card   onClick={()=>showVoucherDetailsHandler(item)}>
            <Card.Img
              variant="top"
              src={item.card}
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <Card.Body className="card-body" style={{ border: "1px solid lightgrey" }}>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.category}</Card.Text>
              
            </Card.Body>
          </Card>
        </Col>
      ))}
    </div>
    <VoucherDetailsModal visible={showModal} voucher={selectedVoucher} onCancel={cancelHandler}/>
    </div>

  );
};

export default VoucherCards;
