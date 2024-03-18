'use client';

// libraries
import { useState } from 'react';
import { MdDone } from 'react-icons/md';

// actions
import addPost from '@/actions/habit/createHabit';

// constants
import { habitFormIcons, themeColors } from '@/constants';

export default function CreateHabit() {
	const [completion, setCompletion] = useState(1);
	const [icon, setIcon] = useState('pulse');
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
								}}>
								+
							</div>
						</div>
					</div>
				</div>
				<label>Icon</label>
				<input
					type='text'
					name='icon'
					readOnly
					value={habitFormIcons?.find((iconDetail) => iconDetail?.name === icon).name}
				/>
				<div>
					{habitFormIcons?.map((iconDetail, index) => {
						return (
							<div
								key={index}
								onClick={(e) => {
									setIcon(iconDetail?.name);
								}}>
								{iconDetail?.icon}
							</div>
						);
					})}
				</div>
				<br />
				<label>Color</label>
				<input
					type='text'
					name='color'
					readOnly
					value={themeColors[color].name}
					style={{
						visibility: 'hidden',
					}}
				/>
				<div>
					{themeColors?.map((color, index) => {
						return (
							<div
								key={index}
								onClick={(e) => {
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
