import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    date: "",
    description: "",
  });

  // getting and setting transaction variable
  const [transactions, setTransactions] = useState(undefined);
  const [tracker, setTracker] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const url = `${process.env.REACT_App_API_URL}/transactions`;
    fetch(url).then((response) => response.json()).then((data) => {
        console.log(data);
        setTransactions((transactions) => {
          if (transactions) {
            let total = 0;
            for (const transaction of data) {
              total += transaction.price;
            }

            setTotal(() => total);
          }
          return data;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tracker]);

  // add new transaction
  const addNewTransaction = (event) => {
    event.preventDefault();

    const price = formData.name.split(" ")[0];
    const url = `${process.env.REACT_App_API_URL}/transaction`;
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: formData.name.substring(price.length + 1),
        price: price,
        date: formData.date,
        description: formData.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTracker(() => true);
        setFormData(() => {
          return {
            name: "",
            price: 0,
            date: "",
            description: "",
          };
        });
      })
      .catch((err) => {
        console.dir(err);
        console.log("Error");
      });
  };

  return (
    <main>
      <h1 className = {`total ${total > 0 ? "green" : "red"}`} >{total}</h1>
      <form onSubmit={(event) => addNewTransaction(event)}>
        <div className="basic">
          <input
            type="text"
            placeholder={"+200 new Samsung Tv"}
            value={formData?.name}
            onChange={(event) => {
              setFormData((formData) => {
                return {
                  ...formData,
                  name: event.target.value,
                };
              });
            }}
          />
          <input
            type="datetime-local"
            value={formData.date}
            onChange={(event) => {
              setFormData((formData) => {
                return {
                  ...formData,
                  date: event.target.value,
                };
              });
            }}
          />
        </div>

        <div className="description">
          <input
            type="text"
            placeholder={"description"}
            onChange={(event) => {
              setFormData((formData) => {
                return {
                  ...formData,
                  description: event.target.value,
                };
              });
            }}
            value={formData.description}
          />
        </div>

        <button type="submit">Add new Transaction</button>
      </form>

      {transactions && (
        <div className="transactions">
          {transactions?.map((transaction) => {
            return (
              <div key={transaction._id} className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div
                    className={`price ${
                      transaction.price > 0 ? "green" : "red"
                    }`}
                  >
                    {transaction.price}
                  </div>
                  <div className="price">{transaction.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
export default App;
