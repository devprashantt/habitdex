'use client';
import addPost from '@/actions/habit/createHabit';
import { HabitFormIcons, themeColors } from '@/constants/NewHabitForm';
import { useState } from 'react';
import { MdDone } from 'react-icons/md';


// icon imports


const icons = HabitFormIcons;
const themeColor = themeColors;


export default function CreateHabit() {
	const [completion, setCompletion] = useState(1);
	const [icon, setIcon] = useState(0);
	const [color, setColor] = useState(0);
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
							<div
								onClick={(e) => {
									setCompletion(Math.max(completion - 1, 1));
								}}>
								-
							</div>
							<div
								onClick={(e) => {
									setCompletion(Math.min(completion + 1, 9));
								}
								}>
								+
							</div>
						</div>
					</div>
				</div>
				<label>Icon</label>
				<input type='text' name="icon" readOnly value={icons[icon].name} style={{
					visibility: 'hidden'
				}} />
				<div>
				{
					icons.map((icon, index) => {
						return <div key={index} onClick={(e)=>{
							setIcon(index);
						}}>
							{icon.icon}
						</div>
					})
				}</div>
				<br />
				<label>Color</label>
				<input type='text' name="color" readOnly value={themeColors[color].name} style={{
					visibility: 'hidden'
				}} />
				<div>
					{themeColor.map((color, index) => {
						return (
							<div
								key={index}
								onClick={(e)=>{
									setColor(index);
								}}
								style={{
									width: '20px',
									height: '20px',
									backgroundColor: color.color,
									borderRadius: '100%',
								}}></div>
						);
					})}
				</div>
			</form>
		</div>
	);
}
