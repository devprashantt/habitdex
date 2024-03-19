'use client';

// libraries
import { MdDone } from 'react-icons/md';

// constants
import { habitFormIcons, themeColors } from '@/constants';

// hooks
import useCreateHabit from '@/hooks/apis/useCreateHabit';

export default function CreateHabit() {

	const {
		formData,
		updateName,
		updateDescription,
        updateIcon,
        increaseCompletion,
		decreaseCompletion,
		updateColor,
		loading,
		handleSubmit
	} = useCreateHabit("pulse", "red-variant-1");

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<button>close</button>
					<h2>New Habit</h2>

					<button disabled={loading} type='submit'><MdDone /></button>

				</div>
				<div>
					<label>Name</label>
					<br />
					<input name='name' value={formData.name} onChange={(e) => updateName(e.target.value)} type='text' />
				</div>
				<div>
					<label>Description</label>
					<br />
					<input name='description' value={formData.description} onChange={(e) => updateDescription(e.target.value)} type='text' />
				</div>
				<div>
					<label>Completion per day</label>
					<div>
						<input name='completions' type='text' readOnly value={formData.completion + ' /Day'} />
						<div>
							<div
								onClick={(e) => {
									decreaseCompletion();
								}}>
								-
							</div>
							<div
								onClick={(e) => {
									increaseCompletion();
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
					value={habitFormIcons?.find((iconDetail) => iconDetail?.name === formData.icon).name}
				/>
				<div>
					{habitFormIcons?.map((iconDetail, index) => {
						return (
							<div
								key={index}
								onClick={(e) => {
									updateIcon(iconDetail?.name);
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
					value={formData.color}
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
									updateColor(color.name);
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
