import MemberData from "../interfaces/Member";
import logo from '../logo.svg';

const getAll = (): Array<MemberData> => {
  return [
    {
      name: "Karan Agrawal",
      portrait: logo,
      children: [
        {
          name: "Eugene Chao",
          portrait: logo,
          children: [
            {
              name: "Elden Yap",
              portrait: logo,
            },
          ],
        },
      ],
    },
    {
      name: "Karan Dhir",
      portrait: logo,
      children: [
        {
          name: "Duck",
          portrait: logo,
        },
        {
          name: "Dog",
          portrait: logo,
        },
        {
          name: "Boom",
          portrait: logo,
        },
      ],
    },
  ];
};

const MemberService = {
  getAll,
};

export default MemberService;
