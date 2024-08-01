import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { getIngredients } from '../../services/slices/burger-ingredients-slice';
import IngredientItem from './ingredient-item/ingredient-item';
import styles from './burger-ingredients.module.css';
import { BurgerIngredientStore, IngredientType } from '../../types';

const BurgerIngredients = () => {
  const { isLoading, isError, data }: BurgerIngredientStore = useSelector((state: any) => state.burgerIngredients);
  const dispatch: any = useDispatch();
  const tabsRef = useRef<HTMLDivElement>(null);
  const groupBunRef = useRef<HTMLHeadingElement>(null);
  const groupSauceRef = useRef<HTMLHeadingElement>(null);
  const groupMainRef = useRef<HTMLHeadingElement>(null);
  const [activeTab, setActiveTab] = useState<IngredientType>('bun');
  const location = useLocation();

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollIngredientGroup = () => {
    const tabsTopCoord = tabsRef.current?.getBoundingClientRect().top;
    const bunTopCoord = groupBunRef.current?.getBoundingClientRect().top;
    const sauceTopCoord = groupSauceRef.current?.getBoundingClientRect().top;
    const mainTopCoord = groupMainRef.current?.getBoundingClientRect().top;
    if (tabsTopCoord && bunTopCoord && sauceTopCoord && mainTopCoord) {
      const arr: number[] = [bunTopCoord, sauceTopCoord, mainTopCoord];
      const closestIndex = arr.findIndex(
        (elem: number) => elem === arr.reduce((prev: number, curr: number) => (Math.abs(curr - tabsTopCoord) < Math.abs(prev - tabsTopCoord) ? curr : prev))
      );
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
    }
  };

  const handleClickTab = (tab: string) => {
    if (activeTab !== 'bun') setActiveTab('bun');
    switch (tab) {
      case 'bun':
        groupBunRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'sauce':
        groupSauceRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'main':
        groupMainRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        groupBunRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  return (
    <>
      <GridLoader color='#fff' loading={isLoading} cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')" }} />
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
            <section>
              <h2 className='text text_type_main-medium' ref={groupBunRef}>
                Булки
              </h2>
              <ul className={`${styles.list} mt-6 mr-2 mb-10 ml-4`}>
                {data
                  .filter((ingredient) => ingredient.type === 'bun')
                  .map((ingredient) => (
                    <Link className={styles.link} key={ingredient._id} to={`/ingredients/${ingredient._id}`} state={{ backgroundLocation: location }}>
                      <IngredientItem key={ingredient._id} ingredient={ingredient} />
                    </Link>
                  ))}
              </ul>
            </section>
            <section>
              <h2 className='text text_type_main-medium' ref={groupSauceRef}>
                Соусы
              </h2>
              <ul className={`${styles.list} mt-6 mr-2 mb-10 ml-4`}>
                {data
                  .filter((ingredient) => ingredient.type === 'sauce')
                  .map((ingredient) => (
                    <Link className={styles.link} key={ingredient._id} to={`/ingredients/${ingredient._id}`} state={{ backgroundLocation: location }}>
                      <IngredientItem key={ingredient._id} ingredient={ingredient} />
                    </Link>
                  ))}
              </ul>
            </section>
            <section>
              <h2 className='text text_type_main-medium' ref={groupMainRef}>
                Начинки
              </h2>
              <ul className={`${styles.list} mt-6 mr-2 mb-10 ml-4`}>
                {data
                  .filter((ingredient) => ingredient.type === 'main')
                  .map((ingredient) => (
                    <Link className={styles.link} key={ingredient._id} to={`/ingredients/${ingredient._id}`} state={{ backgroundLocation: location }} replace={true}>
                      <IngredientItem key={ingredient._id} ingredient={ingredient} />
                    </Link>
                  ))}
              </ul>
            </section>
          </div>
        </article>
      )}
    </>
  );
};

export default BurgerIngredients;
