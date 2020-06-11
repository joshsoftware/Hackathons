class RedisService
  def initialize
    @redis = $redis
  end

  def set_json(key:, data:)
    @redis.set(key, data.to_json)
  rescue StandardError
    nil
  end

  def increment(key:)
    @redis.incr(key)
  end

  def set(key:, value:)
    @redis.set(key, value)
  end

  def get(key:)
    @redis.get(key)
  end

  def del(key:)
    @redis.del(key)
  end

  def get_json(key:)
    JSON.parse(@redis.get(key))
  rescue StandardError
    nil
  end
end
