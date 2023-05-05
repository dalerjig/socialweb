import React from "react";

import s from "./Paginator.module.css";
import { useState } from "react";

let Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize); //общее кол-во людей делим на кол-во отображаемых на одной странице, получаем кол-во страниц
  //ceil -округление вверх, чтобы на последней странице тоже выводислся остаток пользователей
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionSize = 10; //количество страниц в одной "порции"
  let portionCount = Math.ceil(props.totalUsersCount / portionSize); //кол-во порций

  //используем локалйный стейт хуком, для пагинации, чтобы не использовать глоб стейт
  let [portionNumber, setPortionNumber] = useState(1);

  // чтобы рассчитать нумерацию порции(1 порция-10 эл в нашем случае)
  // есть формула граница левой порции начинается с
  //значения равного ==(portionNumber-1)*portionSize+1
  //например (3я порция-1)*10+1=21-элемент с которой будет показываться на 3-ей порции
  //т.е 1 порция 1-10, вторая 11-20, третья 21-30 и т д
  // а граница правой порции== portionNumber*portionSize

  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div>
      {
        portionNumber > 1 && ( //если порция 2 и выше значит покажем кнопку влево
          <button onClick={() => setPortionNumber(portionNumber - 1)}>
            Left
          </button>
        )
        //на онклике(левее)-установи размер порции УМЕНЬШАЯ на 1
      }

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        ) //от и до порционно
        .map((p) => {
          return (
            <span
              onClick={() => props.onPageChanged(p)}
              className={props.currentPage === p && s.selectedPage}
            >
            {p}
            </span>
          );
        })}

      {
        portionCount > portionNumber && ( //если кол-во порций больше чем текущая порция
          <button onClick={() => setPortionNumber(portionNumber + 1)}>
            Right
          </button>
        )
        //на онклике(левее)-установи размер порции УМЕНЬШАЯ на 1
      }
    </div>
  );
};
export default Paginator;
