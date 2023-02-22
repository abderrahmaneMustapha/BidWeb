import { User } from "../../entities/models";
import UserRepository from "../../entities/repositories/mongo/userRepository";

interface updateUserArgs {
    userRepository: UserRepository;
}

const makeUpdateUser = ({ userRepository }: updateUserArgs) => {
    return function updateUser({ body, user }: any) {
        const { item, percentage, amount, amountInitial } = body;
        let _user: User = user as User;

        if (item) {
            updateItems(_user, item);
        }
        if ( percentage && parseInt(percentage) > 0 && parseInt(percentage) < 100
        ) {
            _user.autoBid.percentage = parseInt(percentage);
        }
        if (amountInitial && parseInt(amountInitial) > 0) {
          _user.autoBid.amountInitial = parseInt(amountInitial);
        }
        if (amount && parseInt(amount) > 0) {
            _user.autoBid.amount = parseInt(amount);
        }
        return userRepository.update(user.username, _user);
    };
};

function updateItems(_user: User, item: any) {
  let items = _user.autoBid.items;
  if (items.includes(item)) {
    items = items.filter((i) => i !== item);
  } else {
    items.push(item);
  }
  _user.autoBid.items = items;
}

export default makeUpdateUser;


