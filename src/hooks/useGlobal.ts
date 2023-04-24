import React,{useContext} from 'react'
import { AllContext } from '../context'

const useGlobal = () =>  useContext(AllContext)

export default useGlobal
