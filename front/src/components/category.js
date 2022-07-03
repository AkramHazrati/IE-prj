import Items from "../components/items";
import Data from '../data.json'
import { useParams } from "react-router-dom";

const Category = () => {

	let params = useParams();

	const category = params.category;

	return (
		<div className="items-list">
			{Data.data.filter(items => items.category === category).map(items => 
						<div className="items-list__item">
						<Items
							id={items.id}
							image={items.img}
							size={items.size}
							category={items.category}
							title={items.title}
							price={items.price}

						/>
					</div>
				)}
		</div>
	)
}

export default Category;