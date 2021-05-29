import { isEmpty } from "lodash";
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const carts = useSelector((state) => state.cart);
  const totlPrice = carts.items.reduce((x, price) => x + price.price, 0);
  return (
    <div>
      {!isEmpty(carts.items) ? (
        <>
          <ul className="center-block">
            <table className=" table table-striped table-bordered table-responsive">
              <thead>
                <tr>
                  <th className="text-center">نام دوره</th>
                  <th className="text-center">قیمت دوره</th>
                </tr>
              </thead>
              <tbody>
                {carts.items.map((el) => (
                  <tr key={el._id}>
                    <td className="text-center">{el.title}</td>
                    <td className="text-center">{el.price}</td>
                  </tr>
                ))}
                <tr className="success">
                  <td className="text-center">جمع قیمت :</td>
                  <td className="text-center">{totlPrice}</td>
                </tr>
              </tbody>
            </table>
          </ul>
        </>
      ) : (
        <div className="alert alert-danger">سبد خرید خالی می باشد </div>
      )}
    </div>
  );
};

export default Cart;
