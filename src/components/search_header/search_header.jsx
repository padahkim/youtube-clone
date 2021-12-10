import React , { useRef } from 'react';
import styles from './search_header.module.css';

const Nav_search = ( {onSearch} ) => {
  const inputRef = useRef();
  const resetRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(inputRef.current.value);
    resetRef.current.reset();
  }
  

  return(
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.img} src='images/logo.png'/>
        <h1 className={styles.title}>Youtube</h1>
      </div>
      <form className={styles.form} onSubmit={onSubmit} ref={resetRef}>
        <input className={styles.input} type="text" placeholder='search-keyword' ref={inputRef}></input>
        <button className={styles.button}>
          <img className={styles.buttonImg} src='images/search.png'/>
        </button>
      </form>
    </header>
  );

}
export default Nav_search;

//삽질기2..onSubmit 을 안쓰고 onClick에 하니 value를 읽을 수 없다고 떳다.. e.target.value로 input을 클릭하니 값이 왔다.
//ref값을 받기위해서는 onSubmit을 사용했어야 했다.
//form 없에서 해보고 나중에 추가해보자..
//header에서 받은 input값을 app으로 옮긴다...?콜백!!! 함수 짜식아