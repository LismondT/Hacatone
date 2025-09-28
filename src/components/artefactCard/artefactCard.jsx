



export default function ArtefactCard({
  id,
  image,
  name,
  desc,
  lore,
  rare
}){
  return(
    <div className="artifact-card">
            <div className="artifact-image">
              <img 
                src={image} 
                alt={name || "Изображение"} 
              />
            </div>
            <h3 className="artifact-title">{name}</h3>
            <p className="artifact-desc">{desc}</p>
            <p className="artifact-rarity rare">{rare}</p>
          </div>
  );
}





