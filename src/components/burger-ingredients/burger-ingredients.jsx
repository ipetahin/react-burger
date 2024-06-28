import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIngredients } from '../../services/slices/burger-ingredients-slice';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

import IngredientGroup from './ingredient-group/ingredient-group';

const BurgerIngredients = () => {
  const { isLoading, isError, data } = useSelector((state) => state.burgerIngredients);
  const dispatch = useDispatch();
  const tabsRef = useRef();
  const groupBunRef = useRef();
  const groupSauceRef = useRef();
  const groupMainRef = useRef();
  const [activeTab, setActiveTab] = useState('bun');

  useEffect(() => {
    dispatch(getIngredients())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollIngredientGroup = () => {
    const tabsTopCoord = tabsRef.current.getBoundingClientRect().top;
    const bunTopCoord = groupBunRef.current.getBoundingClientRect().top;
    const sauceTopCoord = groupSauceRef.current.getBoundingClientRect().top;
    const mainTopCoord = groupMainRef.current.getBoundingClientRect().top;
    const arr = [bunTopCoord, sauceTopCoord, mainTopCoord];
    const closestIndex = arr.findIndex((elem) => elem === arr.reduce((prev, curr) => (Math.abs(curr - tabsTopCoord) < Math.abs(prev - tabsTopCoord) ? curr : prev)));
    switch (closestIndex) {
      case 0:
        if (activeTab !== 'bun') setActiveTab('bun');
        break;
      case 1:
        if (activeTab !== 'sauce') setActiveTab('sauce');
        break;
      case 2:
        if (activeTab !== 'main') setActiveTab('main');
        break;
      default:
        setActiveTab('bun');
        break;
    }
  };

  const handleClickTab = (tab) => {
    if (activeTab !== 'bun') setActiveTab('bun');
    switch (tab) {
      case 'bun':
        groupBunRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'sauce':
        groupSauceRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'main':
        groupMainRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        groupBunRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  return (
    <>
      {/* TODO: spinner */}
      {isLoading && <>Идет загрузка ингредиентов...</>}
      {/* TODO: show error */}
      {isError && <>Ошибка при загрузке ингредиентов</>}
      {data && (
        <article className={`pt-10 pb-10`}>
          <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
          <div ref={tabsRef} className={`${styles.tabs} mb-10`}>
            <Tab value='bun' active={activeTab === 'bun'} onClick={handleClickTab}>
              Булки
            </Tab>
            <Tab value='sauce' active={activeTab === 'sauce'} onClick={handleClickTab}>
              Соусы
            </Tab>
            <Tab value='main' active={activeTab === 'main'} onClick={handleClickTab}>
              Начинки
            </Tab>
          </div>
          <div className={`${styles.group}`} onScroll={handleScrollIngredientGroup}>
            <IngredientGroup ingredients={data} title='Булки' type='bun' ref={groupBunRef} />
            <IngredientGroup ingredients={data} title='Соусы' type='sauce' ref={groupSauceRef} />
            <IngredientGroup ingredients={data} title='Начинки' type='main' ref={groupMainRef} />
          </div>
        </article>
      )}
    </>
  );
};

export default BurgerIngredients;
