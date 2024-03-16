'use client';
import addPost from '@/actions/habit/createHabit';
import { useState } from 'react';
import { MdDone } from 'react-icons/md';

const themeColors = [
	{
		name: 'theme-color-1',
		color: '#000000',
	},
];

export default function CreateHabit() {
	const [completion, setCompletion] = useState(0);
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<form action={addPost}>
				<div>
					<button>close</button>
					<h2>New Habit</h2>
					<button type='submit'>
						<MdDone />
					</button>
				</div>
				<div>
					<label>Name</label>
					<br />
					<input name='name' type='text' />
				</div>
				<div>
					<label>Description</label>
					<br />
					<input name='description' type='text' />
				</div>
				<div>
					<label>Completion per day</label>
					<div>
						<input name='completions' type='text' readOnly value={completion + ' /Day'} />
						<div>
							<button
								onClick={(e) => {
									e.preventDefault();
									setCompletion(Math.max(completion - 1, 0));
								}}>
								-
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									setCompletion(Math.min(completion + 1, 10));
								}}>
								+
							</button>
						</div>
					</div>
				</div>
				<label>Icon</label>
				<br />
				<label>Color</label>
				<div>
					{themeColors.map((color, index) => {
						return (
							<div
								key={index}
								style={{
									width: '20px',
									height: '20px',
									backgroundColor: color,
									borderRadius: '100%',
								}}></div>
						);
					})}
				</div>
			</form>
		</div>
	);
}
