import bcrypt from 'bcryptjs';

import { PrismaClient } from "@prisma/client";
import { sc } from '../constants';
import { UserCreateDTO } from '../interfaces/UserCreateDto';
import { UserSignInDto } from '../interfaces/UserSignInDto';
const prisma = new PrismaClient();

//* 유저 생성
const createUser = async (userCreateDto: UserCreateDTO) => {
  //? 넘겨받은 password를 bcrypt의 도움을 받아 암호화
  const salt = await bcrypt.genSalt(10); //^ 매우 작은 임의의 랜덤 텍스트 salt
  const password = await bcrypt.hash(userCreateDto.password, salt); //^ 위에서 랜덤을 생성한 salt를 이용해 암호화

  const data = await prisma.user.create({
    data: {
      userName: userCreateDto?.name,
      age: userCreateDto?.age,
      email: userCreateDto.email,
      password,
    },
  });

  return data;
};

//* user 전체 조회
const getAllUser = async (page:number, limit:number) => {
  const data = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  }
  );

  return data;
};


//* userId로 유저 조회
const getUserById = async (userId: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  return user;
};

// * 유저 정보 업데이트
const updateUser = async (userId: number, userName: string) => {
  const user = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      userName: userName
    }
  })

  return user;
}

// * 유저 삭제
const deleteUser = async (userId: number) => {
  const user = await prisma.user.delete({
    where: {
      id: userId
    }
  })
  return user;
}

const signIn = async (userSignInDto: UserSignInDto) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: userSignInDto.email,
      },
    });
    if (!user) return null;

    //? bcrypt가 DB에 저장된 기존 password와 넘겨 받은 password를 대조하고,
    //? match false시 401을 리턴
    const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
    if (!isMatch) return sc.UNAUTHORIZED;

    return user.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// * 이름으로 유저 조회
const searchUserByName = async (keyword:string, option:string) => {

  
  if ( option === 'desc') {
    const data = await prisma.user.findMany({
      where: {
        userName: {
          contains: keyword
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  
    return data;
  }

  if (option === 'asc') {
    const data = await prisma.user.findMany({
      where: {
        userName: {
          contains: keyword
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
    return data;
  }
    if (option === 'nameDesc') {
      const data = await prisma.user.findMany({
        where: {
          userName: {
            contains: keyword
          }
        },
        orderBy: {
          userName: 'desc'
        }
      })
      return data;
    }

};

const userService = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  signIn,
  searchUserByName
};

export default userService;