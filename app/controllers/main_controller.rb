class MainController < ApplicationController
  def index
    @creatures = Creature.all
    @creature = Creature.new
     @tags = Tag.all
  end
end
