import React from "react";
import { useTodosStore } from "../../../utils/store";
import Category from "./Category";
import styles from "./AllCategory.module.css";
import Card from "../UI/Card";
import Wrapper from "../UI/Wrapper";

const AllCategory = () => {
    const categories = useTodosStore((state) => state.categories);
    const [showItems, setShowItems] = React.useState(null);

    return (
        <Wrapper>
            {categories.length !== 0 ? (
                <Card className={styles.Category}>
                    {categories.map((category, index) => (
                        <Category
                            key={category.catId}
                            id={category.catId}
                            name={category.name}
                            showItems={showItems === index ? true : false}
                            setShowItems={() => setShowItems(index)}
                        />
                    ))}
                </Card>
            ) : (
                <p className={styles.cat_text}>Sorry! Add Some Categories to Start</p>
            )}
        </Wrapper>
    );
};

export default AllCategory;
