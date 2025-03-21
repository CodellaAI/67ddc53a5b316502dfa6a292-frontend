
import TweetItem from './TweetItem'

export default function TweetList({ tweets }) {
  if (!tweets || tweets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-secondary-dark text-lg mb-2">No tweets to display</p>
        <p className="text-secondary-light text-sm">Follow more people to see their tweets</p>
      </div>
    )
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <TweetItem key={tweet._id} tweet={tweet} />
      ))}
    </div>
  )
}
