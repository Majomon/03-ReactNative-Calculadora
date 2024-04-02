import {useRef, useState} from 'react';

enum Operator {
  add,
  subtract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
  };

  const deleteOperation = () => {
    let currentSing = '';
    let temporalNumber = number;
    if (number.includes('-')) {
      currentSing = '-';
      temporalNumber = number.substring(1);
    }

    if (temporalNumber.length > 1) {
      return setNumber(currentSing + temporalNumber.slice(0, -1));
    }
    setNumber('0');
  };

  const toggleSing = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    } else {
      setNumber(`-${number}`);
    }
  };

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      /* Punto decimal */
      if (numberString === '.') {
        return setNumber(number + numberString);
      }

      /* Evaluar si es otro cero y no hay punto */
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      /* Evaluar si es diferente de cero, no hay punto y es el primer número */
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }

      /* Evitar el 0000.00 */
      if (numberString === '0' && !number.includes('.')) {
        return;
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  const setLastNumber = () => {
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  };

  const divieOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  return {
    //Properties
    number,
    //Methods
    buildNumber,
    deleteOperation,
    clean,
    toggleSing,
    prevNumber,
    divieOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
  };
};
