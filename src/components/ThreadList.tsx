import Thread from "./Thread";

const threads = [
  {
    id: 1,
    name: "name123",
    date: new Date("2024-05-01T14:30:00"),
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    contents:
      "Morbi sed est mauris. Morbi sed dignissim nisl. Integer ullamcorper viverra urna. Sed eleifend neque nibh, eget mattis nisi euismod in. Sed sit amet justo quis nibh cursus porttitor. Vestibulum rhoncus lorem vel augue ornare imperdiet. Etiam id nisl congue, fermentum leo sit amet, scelerisque ante. Mauris rutrum, erat sed pharetra aliquam, nisl mauris rhoncus risus, et pharetra ex magna et lorem. Quisque sit amet maximus lorem. Fusce eu quam lorem. Aenean aliquam malesuada efficitur. Nam vitae odio porta orci tincidunt pellentesque ac eget nibh. Aliquam rhoncus nisl augue, nec vehicula ex imperdiet at. Praesent consectetur volutpat bibendum. Etiam bibendum vel nulla ac tristique. Suspendisse ullamcorper lacus quis orci suscipit faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam orci ex, vehicula ac lacinia id, porttitor eu nulla. Nulla vel arcu aliquam, faucibus dolor ac, bibendum mauris. Aliquam vehicula malesuada faucibus. Mauris vehicula ante eros, in lobortis sapien euismod vel.",
    isStarred: true,
    likes: 11,
    comments: 14,
  },
  {
    id: 2,
    name: "unknown",
    date: new Date("2024-04-20T14:30:00"),
    title: "Etiam elementum porttitor porttitor.",
    contents:
      "Donec egestas eleifend orci, et ultricies odio commodo consectetur. Quisque velit odio, feugiat sit amet purus sed, blandit rhoncus nunc. Maecenas quis convallis ligula, vel pulvinar eros. Phasellus tincidunt, quam et pulvinar luctus, felis tellus volutpat ex, venenatis lobortis lectus sapien sit amet odio. Phasellus dapibus porta ante, ac dapibus quam viverra sed. Cras pretium nulla a vehicula vestibulum. Nunc eget enim ac justo maximus fermentum quis vel augue. Aenean et est pellentesque, sodales eros ut, feugiat nisi. Mauris non justo vel elit scelerisque tristique. Sed et dapibus enim. Vestibulum mattis et justo eu dapibus. Nulla luctus vulputate quam, quis gravida magna dictum nec.",
    isStarred: false,
    likes: 3,
    comments: 4,
  },
  {
    id: 3,
    name: "whoAreYou",
    date: new Date("2024-03-20T14:30:00"),
    title: "Morbi varius quam at ante pretium tincidunt.",
    contents:
      "Sed dignissim mi at scelerisque sollicitudin. Donec facilisis dapibus elit, eu pharetra tortor lacinia vitae. Nullam eu turpis pulvinar, pretium nulla ut, posuere arcu. Phasellus auctor volutpat est, vel eleifend risus feugiat blandit. Quisque molestie nibh quis sem fermentum ultricies. Sed ultrices malesuada quam, et viverra quam. Mauris eget purus metus.",
    isStarred: false,
    likes: 0,
    comments: 10,
  },
];

function ThreadList() {
  return (
    <div>
      <ul className="flex flex-col gap-y-2 p-2">
        {threads.map((thread, idx) => (
          <li key={thread.id} className="flex flex-col gap-y-4 mb-2">
            {idx > 0 && <div className="border w-full h-0"></div>}
            <Thread {...thread} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThreadList;
