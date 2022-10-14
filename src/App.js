//1. 데이터 초기화
// import React, { useEffect, useState } from "react";
// import datas from './data/cards.js';
//
// export default function App() {
//
//   const [cards, setCards] = useState([]);
//
//   useEffect(() => {
//     setCards(datas);
//   }, []);
//
//
//   return <div>App</div>;
// }


// 2. 추첨하기 버튼과 명함 컴포넌트 구현
import React, { useEffect, useState } from "react";
import datas from './data/cards.js';
import BusinessCard from "./components/BusinessCard.js";


export default function App() {

  const [cards, setCards] = useState([]);
  const [pickedCards, setPickedCards] = useState([]);

  function cardDraw() {
      //조건 추가
      //이미 뽑힌 사람이 3명이라면, 밑에 코드들은 타지 않게 해야 함.
      //if문 작성 후 미리 return 적어두면 좋음.
      if(pickedCards.length > 2) {
          const names = pickedCards.reduce((acc, cur) => {
              return acc = acc.concat(`${cur.name},`)
          }, "")
          return alert(`당첨자는 ${names} 입니다!`)
      }
      //추첨하기 버튼을 누르면, 랜덤하게 하나의 명함을 고른다.
      const randomIdx = Math.floor(Math.random() * cards.length);
      const randomItem = cards[randomIdx];

      //중복 제거
      setCards(cards.filter(c => c.phoneNumber !== randomItem.phoneNumber));
      //당첨자(Arr) 관리
      //첫번째 방식으로 하면 당첨자가 추가되지 않고 다시 뽑을 때마다 기존 당첨자는 날아가게 됨.
      //두번째 방식과 같이 뽑힌 당첨자 리스트에 방금 뽑은 당첨자를 추가해주는 방식으로 해줘야 함.
      //setPickedCards([randomItem])
      setPickedCards([...pickedCards, randomItem]);
  }

  useEffect(() => {
    setCards(datas);
  }, []);


  //첫번째 return문으로 작성시에는, 전체 당첨자가 아닌 가장 최근에 당첨된 1명만 보여진다.
  // return (
  //     <div>
  //         {cards.length > 0 && <button onClick={cardDraw}>추첨하기</button>}
  //         {/*pickedCards의 마지막 요소를 보내주면, businessCard에게 가장 최근 사람의 정보를 넘겨주게 됨.*/}
  //         {pickedCards.length > 0 && <BusinessCard info={pickedCards[pickedCards.length -1]} />}
  //     </div>
  // );


    //두번째 return문으로 작성시에는, 당첨자들이 모두 보여지게 된다.
    //key는 고유하게 식별할 수 있는 값으로 사용해야 한다. 반드시 map 함수를 돌릴 때 사용할 것.
    const result = pickedCards.map(pickedCard => <BusinessCard info={pickedCard} key={pickedCard.phoneNumber}/>);

    return (
        <div>
            {cards.length > 0 && <button onClick={cardDraw}>추첨하기</button>}
            {/*pickedCards의 마지막 요소를 보내주면, busiqnessCard에게 가장 최근 사람의 정보를 넘겨주게 됨.*/}
            {pickedCards.length > 0 && result}
        </div>
    );
}
