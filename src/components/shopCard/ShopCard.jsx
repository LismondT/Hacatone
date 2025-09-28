

export default function ShopCard({
  id,
  image,
  name,
  desc,
  price,
  count,
  rank_id
}){
  return(
    <div className="shop-card">
            <div className="item-img">
              <img 
                src={image} 
                alt={name || "Изображение"} 
              />  
            </div>
            <h3>{name}</h3>
            <p className="item-desc">{desc}</p>
            <p className="item-price">{price}⚡</p>
            <p className="item-count">Осталось на складе: {count} шт.</p>
            <button className="buy-btn">Купить</button>
          </div>
  );
}