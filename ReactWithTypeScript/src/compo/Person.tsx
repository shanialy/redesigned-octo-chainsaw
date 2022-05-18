import React, { FC, useState } from "react";
export enum colors {
  Black = "Dark",
  Blue = "Light",
}

// interface Props {
//     name:string,
//     age:number
// }
interface Props {
  name: string;
  age: number;
  color: colors;
}

// export const Person = (props: Props) => {
//   return <div>
//       <h1>{props.name}{props.age}
//       </h1>
//   </div>;
// };
// export const Person = ({name,age}: Props) => {
//   return (
//     <div>
//       <h1>
//         {name}
//         {age}
//       </h1>
//     </div>
//   );
// };
// export const Person:FC<Props> = ({name,age}) => {
//   return (
//     <div>
//       <h1>
//         {name}
//         {age}
//       </h1>
//     </div>
//   );
// };
// export const Person: FC<Props> = ({ name, age }) => {
//     const [country,setCountry] = useState<string | null>("")
//   return (
//     <div>
//       <h1>
//         {name}
//         {age}
//       </h1>
//       <input placeholder="write" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
//           setCountry(e.target.value)
//       }}
//        />
//       {country}
//     </div>
//   );
// };
// export const Person: FC<Props> = ({ name, age }) => {
//   const [country, setCountry] = useState<string | null>("");
//   return (
//     <div>
//       <h1>
//         {name}
//         {age}
//       </h1>
//       <input
//         placeholder="write"
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//           setCountry(e.target.value);
//         }}
//       />
//       {country}
//       {colors.Black}
//     </div>
//   );
// };
// export const Person: FC<Props> = ({ name, age,color }) => {
//   const [country, setCountry] = useState<string | null>("");
//   return (
//     <div>
//       <h1>
//         {name}
//         {age}
//       </h1>
//       <input
//         placeholder="write"
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//           setCountry(e.target.value);
//         }}
//       />
//       {country}
//       {color}
//     </div>
//   );
// };
export const Person: FC<Props> = ({ name, age, color }) => {
  const [country, setCountry] = useState<string | null>("");
  return (
    <div>
      <h1>
        {name}
        {age}
      </h1>
      <input
        placeholder="write"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCountry(e.target.value);
        }}
      />
      {country}
      {color}
    </div>
  );
};
