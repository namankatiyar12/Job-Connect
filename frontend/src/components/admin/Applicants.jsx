import { setAllApplicants } from '@/redux/applicationSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';

const Applicants = () => {
    const params=useParams();
    const dispatch=useDispatch();
    const {applicants}=useSelector(store=>store.application);
    useEffect(()=>{
        const fetchAllApplicants= async()=>{
            try{
                const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
                dispatch(setAllApplicants(res.data.job));
            }
            catch(error){

                console.log(error);
            }
        }

        fetchAllApplicants();
    },[]);
  return (
    <div>
        <Navbar />
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6'>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">Hiring workspace</p>
            <h1 className='mb-6 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl'>
                Review applicants <span className="text-slate-400">({applicants?.applications?.length || 0})</span>

            </h1>
            <ApplicantsTable/>



        </div>
    </div>
  )
}

export default Applicants