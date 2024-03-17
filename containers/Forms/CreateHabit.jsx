'use client';
import addPost from '@/actions/habit/createHabit';
import { useState } from 'react';
import { MdDone } from 'react-icons/md';


// icon imports
import { CiWavePulse1 } from "react-icons/ci";
import { IoAlarmOutline } from "react-icons/io5";
import { CiApple } from "react-icons/ci";
import { FaBed } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaHeartCircleBolt } from "react-icons/fa6";
import { TbMoodKid } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { FaTerminal } from "react-icons/fa";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FaYinYang } from "react-icons/fa";
import { CiMusicNote1 } from "react-icons/ci";
import { FaShower } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { RiCupLine } from "react-icons/ri";
import { TbCurrencyDollar } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { LuLeaf } from "react-icons/lu";
import { GiConsoleController } from "react-icons/gi";
import { FaBicycle } from "react-icons/fa";


const icons = [
	{
		name: "pulse",
		icon: <CiWavePulse1 />
	},
	{
		name: "alarm",
		icon: <IoAlarmOutline />
	},
	{
		name: "apple",
        icon: <CiApple />
	},
	{
		name: "bed",
        icon: <FaBed />
	},
	{
		name: "wallet",
        icon: <FaWallet />
	},
	{
		name: "heartBolt",
        icon: <FaHeartCircleBolt />
	},
	{
		name: "moodKid",
        icon: <TbMoodKid />
	},
	{
        name: "gym",
        icon: <CgGym />
    },
	{
		name: "book",
        icon: <FaBook />
	},
	{
		name: "terminal",
        icon: <FaTerminal />
	},
	{
		name: "colorPalette",
        icon: <IoColorPaletteOutline />
	},
	{
		name: "yinYang",
        icon: <FaYinYang />
	},
	{
		name: "musicNote",
        icon: <CiMusicNote1 />
	},
	{
		name: "shower",
        icon: <FaShower />
	},
	{
		name: "notes",
        icon: <TbNotes />
	},
	{
		name: "cup",
        icon: <RiCupLine />
	},
	{
		name: "dollar",
		icon: <TbCurrencyDollar />
	},
	{
		name: "heart",
        icon: <CiHeart />
	},
	{
		name: "leaf",
		icon: <LuLeaf />
	},
	{
		name: "console",
		icon: <GiConsoleController />
	},
	{
        name: "bicycle",
        icon: <FaBicycle />
    }
];


const themeColors = [
	{
		name: 'red-variant-1',
		color: '#fa923c',
	},
	{
		name: 'orange-variant-1',
        color: '#fe913a',
	},
	{
		name: 'yellow-variant-1',
        color: '#fabf22',
	},
	{
		name: 'yellow-variant-2',
        color: '#facc16',
	},
	{
		name: 'green-variant-1',
        color: '#a2e637',
	},
	{
		name: 'green-variant-2',
        color: '#50e07f',
	},
	{
		name: 'green-variant-3',
		color: '#36d298',
	},
	{
		name: 'blue-variant-1',
        color: '#2dd4c0',
	},
	{
		name: 'blue-variant-2',
        color: '#20d3ec',
	},
	{
		name: 'blue-variant-3',
        color: '#39bffb',
	},
	{
		name: 'blue-variant-4',
        color: '#5fa6fb',
	},
	{
		name: 'purple-variant-1',
        color: '#818df9',
	},
	{
		name: 'purple-variant-2',
        color: '#9987d9',
	},
	{
		name: 'purple-variant-3',
        color: '#c085fc',
	},
	{
		name: 'pink-variant-1',
        color: '#e978f9',
	},
	{
		name: 'pink-variant-2',
        color: '#f572b5',
	},
	{
		name: 'pink-variant-3',
        color: '#fb7387',
	},
	{
		name: 'gray-variant-1',
		color: '#94a2b9',
	},
	{
		name: 'gray-variant-2',
        color: '#9da3ae',
	},
	{
		name: 'gray-variant-3',
        color: '#a2a3a2',
	},
	{
		name: 'gray-variant-4',
        color: '#a6a29f',
	}
];



export default function CreateHabit() {
	const [completion, setCompletion] = useState(0);
	

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
				<div>
					{
						icons.map((icon) => (
                            <div key={icon.name}>
                                {icon.icon}
                            </div>
                        ))
					}
				</div>
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
