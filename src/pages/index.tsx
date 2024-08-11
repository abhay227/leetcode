import Image from "next/image";
import { Inter } from "next/font/google";
// import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import { useState } from "react";
import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import useHasMounted from "@/components/hooks/useHasMounted";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [loadingProblems, setLoadingProblems] = useState(true);
	// const hasMounted = useHasMounted();

	// if(!hasMounted) return null;

	const [inputs, setInputs] = useState({
		id: '',
		title: '',
		difficulty: '',
		category: '',
		order: 0,
		videoId: '',
		link: '',
		likes:0,
		dislikes:0,
	  });

	  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs({
		  ...inputs,
		  [name]: value
		});
	  };
	  console.log(inputs);

	  const handleSubmit = async(e:React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const newprob = {
			...inputs,
			order: Number(inputs.order),
		}

		await setDoc(doc(firestore,"problems",inputs.id),newprob);
		alert("saved to db")
	  };
	

  return (
    <main className='bg-dark-layer-2 min-h-screen'>
				<Topbar />
				<h1
					className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5'
				>
					&ldquo; QUALITY OVER QUANTITY &rdquo; 👇
				</h1>
				<div className='relative overflow-x-auto mx-auto px-6 pb-10'>
					{loadingProblems && (
						<div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
							{[...Array(10)].map((_, idx) => (
								<LoadingSkeleton key={idx} />
							))}
						</div>
					)}
					<table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
						{!loadingProblems && (
							<thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
								<tr>
									<th scope='col' className='px-1 py-3 w-0 font-medium'>
										Status
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Title
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Difficulty
									</th>

									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Category
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Solution
									</th>
								</tr>
							</thead>
						)}
						<ProblemsTable setLoadingProblems={setLoadingProblems} />
					</table>
				</div>

				{/* <form onSubmit={handleSubmit}>
      <label>
        Problem ID:
        <input 
          type="text" 
          name="id" 
          value={inputs.id} 
          onChange={handleChange} 
        />
      </label>
      <br />
      <label>
        Title:
        <input 
          type="text" 
          name="title" 
          value={inputs.title} 
          onChange={handleChange} 
        />
      </label>
      <br />
      <label>
        Difficulty:
        <input 
          type="text" 
          name="difficulty" 
          value={inputs.difficulty} 
          onChange={handleChange} 
        />
      </label>
      <br />
      <label>
        Category:
        <input 
          type="text" 
          name="category" 
          value={inputs.category} 
          onChange={handleChange} 
        />
      </label>
      <br />
      <label>
        Order:
        <input 
          type="text" 
          name="order" 
          value={inputs.order} 
          onChange={handleChange} 
        />
      </label>
      <br />
      <label>
        Video ID:
        <input 
          type="text" 
          name="videoId" 
          value={inputs.videoId} 
          onChange={handleChange} 
        />
      </label>
      <br />
      <label>
        Link:
        <input 
          type="text" 
          name="link" 
          value={inputs.link} 
          onChange={handleChange} 
        />
      </label>
      <br />
      <button type="submit">Save</button>
    </form> */}

			</main>
  );
}

const LoadingSkeleton = () => {
	return (
		<div className='flex items-center space-x-12 mt-4 px-6'>
			<div className='w-6 h-6 shrink-0 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};
