import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams, useLocation } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const ingredientData = ingredients.find((item) => item._id === id);

  const isModal = location.state?.background;

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI ingredientData={ingredientData} showTitle={!isModal} />
  );
};
