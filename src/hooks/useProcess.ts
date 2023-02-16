import { useContext } from 'react';
import { ProcessContext, ProcessContextType } from '../context/ProcessContextProvider';

const useProcess = () => {
    const process = useContext<ProcessContextType>(ProcessContext);
    return process;
};

export default useProcess;
