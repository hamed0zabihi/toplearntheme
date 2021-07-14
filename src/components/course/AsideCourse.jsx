import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddToCart } from "../../actions/cart";

const AsideCourse = ({ price, id, course }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(AddToCart(course));
  };

  if (cart.items.find((el) => el._id === id)) {
    console.log(true);
  } else {
    console.log(false);
  }
  return (
    <aside className="col-md-4 col-sm-12 col-xs-12 pull-right">
      <div className="statistics">
        <ul>
          <li>
            <span> مدت دوره </span>
            <i> 03:12:52 </i>
          </li>
          <li>
            <span> تعداد ویدیوها </span>
            <i> 16 </i>
          </li>
          <li>
            <span> تعداد دانشجوها </span>
            <i> 52 نفر </i>
          </li>
        </ul>

        {cart.items.find((el) => el._id === id) ? (
          <Link to="/cart" style={{ backgroundColor: "transparent" }}>
            <button className="center-block btn btn-default ">
              موجود در سبد خرید<i className="fa fa-shopping-cart"></i>
            </button>
          </Link>
        ) : (
          <a href="/#" onClick={handleAddToCart}>
            شرکت در دوره : {price} تومان
          </a>
        )}
      </div>

      <article className="teacher-info">
        <img src="../images/pic/avatar.jpg" alt="avatar" />
        <h2> مدرس : ایمان مدائنی </h2>
        <p>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است استفاده از طراحان گرافیک است ...
        </p>
      </article>

      <article className="term-info">
        <h2> اطلاعات این دوره </h2>
        <ul>
          <li>سطح دوره: پیشرفته</li>
          <li>وضعیت دوره: در حال برگزاری</li>
          <li>قیمت : {price} تومان</li>
          <li>تاریخ ثبت این دوره : چهار شنبه ۲۱ شهریور ۱۳۹۷</li>
          <li>آخرین بروزرسانی دوره : چهار شنبه ۲۱ شهریور ۱۳۹۷</li>
        </ul>
      </article>

      <div className="share-layer">
        <span> به اشتراک گذاری </span>
        <a href="/#">
          <i className="zmdi zmdi-facebook"></i>
        </a>
        <a href="/#">
          <i className="zmdi zmdi-google-old"></i>
        </a>
        <a href="/#">
          <i className="zmdi zmdi-twitter"></i>
        </a>
        <a href="/#">
          <i className="zmdi zmdi-linkedin"></i>
        </a>
      </div>

      <div className="tags-layer">
        <a href="/#"> ربات تلگرام </a>
        <a href="/#"> ساخت ربات </a>
        <a href="/#"> برنامه نویسی ربات </a>
        <a href="/#"> کدنویسی ربات </a>
        <a href="/#"> ربات تلگرام </a>
        <a href="/#"> ساخت ربات </a>
        <a href="/#"> برنامه نویسی ربات </a>
        <a href="/#"> کدنویسی ربات </a>
      </div>
    </aside>
  );
};

export default AsideCourse;
