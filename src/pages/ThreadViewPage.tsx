import ThreadView from "@components/ThreadView";
import { Thread } from "models/thread";

const thread: Thread = {
  id: 1,
  name: "name123",
  createDate: new Date("2024-05-01T14:30:00"),
  title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  contents:
    "Morbi sed est mauris. Morbi sed dignissim nisl. Integer ullamcorper viverra urna. Sed eleifend neque nibh, eget mattis nisi euismod in. Sed sit amet justo quis nibh cursus porttitor. Vestibulum rhoncus lorem vel augue ornare imperdiet. Etiam id nisl congue, fermentum leo sit amet, scelerisque ante. Mauris rutrum, erat sed pharetra aliquam, nisl mauris rhoncus risus, et pharetra ex magna et lorem. Quisque sit amet maximus lorem. Fusce eu quam lorem. Aenean aliquam malesuada efficitur. Nam vitae odio porta orci tincidunt pellentesque ac eget nibh. Aliquam rhoncus nisl augue, nec vehicula ex imperdiet at. Praesent consectetur volutpat bibendum. Etiam bibendum vel nulla ac tristique. Suspendisse ullamcorper lacus quis orci suscipit faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam orci ex, vehicula ac lacinia id, porttitor eu nulla. Nulla vel arcu aliquam, faucibus dolor ac, bibendum mauris. Aliquam vehicula malesuada faucibus. Mauris vehicula ante eros, in lobortis sapien euismod vel.",
  isStarred: true,
  likesCount: 11,
  commentsCount: 4,
  commentList: [
    {
      id: 1,
      name: "unknown",
      createDate: new Date("2024-05-01T14:30:00"),
      contents: "이것은 댓글입니다.",
      likesCount: 1,
    },
    {
      id: 2,
      name: "namenamename",
      createDate: new Date("2024-05-02T14:30:00"),
      contents: "이것은 댓글입니다.",
      likesCount: 0,
    },
    {
      id: 3,
      name: "whoareyou",
      createDate: new Date("2024-05-03T14:30:00"),
      contents:
        "이것은 댓글입니다. 이것은 댓글입니다. 이것은 댓글입니다. 이것은 댓글입니다. 이것은 댓글입니다. 이것은 댓글입니다.",
      likesCount: 4,
    },
    {
      id: 4,
      name: "asdasdasd",
      createDate: new Date("2024-05-04T14:30:00"),
      contents: "이것은 댓글입니다.",
      likesCount: 12,
    },
  ],
};

function ThreadViewPage() {
  return (
    <div className="px-4 py-2">
      <ThreadView thread={thread} />
    </div>
  );
}

export default ThreadViewPage;
